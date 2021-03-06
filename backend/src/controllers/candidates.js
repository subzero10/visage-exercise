const {Candidate} = require("../database/models");
const {defaultPageSize, bonusAwardMessage} = require("../utils/config");

const getPaginatedCandidates = async (req) => {
  const limit = req.query.size || defaultPageSize;
  const offset = req.query.page ? ((req.query.page - 1) * limit) : 0;
  const results = await Candidate.findAndCountAll({
    limit,
    offset
  });
  const {count: totalItems, rows: candidates} = results;
  const currentPage = req.query.page || 1;
  const totalPages = Math.ceil(totalItems / limit);

  return {totalItems, candidates, totalPages, currentPage: +currentPage};
};

const getAllCandidates = async (req, res) => {
  try {
    const paginated = await getPaginatedCandidates(req, res);
    return res.status(200).json(paginated);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

const getSubmissionsCountForSource = async (uploadSource) => {
  if (!uploadSource) {
    return 0;
  }

  return Candidate.count({
    where: {
      source: uploadSource
    }
  });
};

const shouldAwardBonusMessage = (count) => {
  return count % 10 === 0;
};

const createCandidate = async (req, res) => {
  if (!req.body || !req.body.candidate) {
    return res.status(400).send("invalid request");
  }

  try {
    const candidate = await Candidate.create(req.body.candidate);
    const submissionsCount = await getSubmissionsCountForSource(req.body.candidate.source);
    const bonusMessage = shouldAwardBonusMessage(submissionsCount) ? bonusAwardMessage : undefined;
    return res.status(200).json({
      submissionsCount,
      bonusMessage,
      candidate: {id: candidate.id}
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getAllCandidates,
  createCandidate
};

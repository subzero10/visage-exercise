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

const shouldAwardBonusMessage = async (uploadSource) => {
  if (!uploadSource) {
    return 0;
  }

  return await Candidate.count({
    where: {
      source: uploadSource
    }
  }) % 10 === 0;
};

const createCandidate = async (req, res) => {
  if (!req.body || !req.body.candidate) {
    return res.status(400).send("invalid request");
  }

  try {
    const candidate = await Candidate.create(req.body.candidate);
    const bonusMessage = await shouldAwardBonusMessage(req.body.candidate.source) ? bonusAwardMessage : undefined;
    return res.status(200).json({
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

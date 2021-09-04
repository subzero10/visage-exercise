"use strict";

const path = require("path");
const fs = require("fs");
const faker = require("faker");

const getFakeCandidate = function (resumeIds) {
  const resumeId = resumeIds[getRandomInt(resumeIds.length)];
  return {
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    resumeId: resumeId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

module.exports = {
  /* eslint-disable no-unused-vars */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Resumes", [
      {
        fileName: "cv1.pdf",
        fileType: ".pdf",
        fileData: fs.readFileSync(path.join(path.resolve(__dirname), "sample.pdf")),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fileName: "cv2.doc",
        fileType: ".doc",
        fileData: fs.readFileSync(path.join(path.resolve(__dirname), "sample_100kb.doc")),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fileName: "cv3.docx",
        fileType: ".docx",
        fileData: fs.readFileSync(path.join(path.resolve(__dirname), "sample_100kb.docx")),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);

    const resumeIdsQuery = await queryInterface.sequelize.query("select id from \"Resumes\"");
    const resumeIds = resumeIdsQuery[0].map(x => x.id);
    const candidates = [];
    for (let i = 0; i < 1000; i++) {
      candidates.push(getFakeCandidate(resumeIds));
    }

    await queryInterface.bulkInsert("Candidates", candidates);
  },

  /* eslint-disable no-unused-vars */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Resumes", null, {});
    await queryInterface.bulkDelete("Candidates", null, {});
  }
};

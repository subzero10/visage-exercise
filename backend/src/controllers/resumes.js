const path = require("path");
const stream = require('stream');
const {Resume} = require("../database/models");

const getResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            where: {
                id: req.params.id
            }
        });
        
        if (!resume) {
            return res.status(400).send(`cannot find resume with id[${req.params.id}]`);
        }

        const fileContents = Buffer.from(resume.fileData, "base64");
        const readStream = new stream.PassThrough();
        readStream.end(fileContents);
        res.set('Content-disposition', 'attachment; filename=' + resume.fileName);
        res.set('Content-Type', 'text/plain');

        readStream.pipe(res);

        return res;
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const storeResume = async (req, res) => {
    if (!req.file || !req.file.buffer) {
        return res.status(400).send("invalid request");
    }

    try {
        const resume = await Resume.create({
            fileName: req.file.originalname,
            fileType: path.extname(req.file.originalname),
            fileData: req.file.buffer
        });
        return res.status(200).json({resume: {id: resume.id}})
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = {
    getResume,
    storeResume
};

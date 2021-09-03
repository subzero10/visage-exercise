const path = require('path');
const express = require('express');
const multer = require('multer');
const config = require('../utils/config');
const router = express.Router();
const candidates = require('../controllers/candidates');
const resumes = require('../controllers/resumes');
const storage = multer.memoryStorage();
const upload = multer({storage, limits: {fileSize: config.maxUploadSize}});

router
    .get('/', (req, res) => {
        res.sendFile(path.join(config.clientSideAppPath, 'index.html'))
    })
    .post('/api/resume', upload.single('file'), (req, res) => {
        return resumes.storeResume(req, res);
    })
    .get('/api/resume/:id', (req, res) => {
        return resumes.getResume(req, res);
    })
    .post('/api/candidate', (req, res) => {
        return candidates.createCandidate(req, res);
    })
    .get('/api/candidates', (req, res) => {
        return candidates.getAllCandidates(req, res);
    });

module.exports = router;

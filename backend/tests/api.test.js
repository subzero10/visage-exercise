const request = require('supertest');

const db = require('../src/database/models');
const app = require('../src/http/app');
const config = require('../src/utils/config');

jest.mock('multer', () => {
    const multer = () => ({
        single: () => {
            return (req, res, next) => {
                req.file = {
                    originalname: 'sample.name',
                    mimetype: 'sample.type',
                    path: 'sample.url',
                    buffer: Buffer.from('whatever'),
                };

                return next();
            }
        },
    })
    multer.memoryStorage = () => jest.fn();
    return multer;
});

beforeAll(async () => {
    return await db.sequelize.sync({force: true});
});

beforeEach(async () => {
    return await db.sequelize.truncate();
});

test('it should store a resume', async function () {
    await request(app)
        .post('/api/resume')
        .expect(200);

    const result = await db.Resume.findAll({});
    expect(result.length === 1).toBeTruthy();
    expect(result[0].fileName === 'sample.name').toBeTruthy();
});

test('it should store a candidate', async function () {
    const res = await request(app)
        .post('/api/resume')
        .expect(200);

    await request(app)
        .post('/api/candidate')
        .send({candidate: {name: 'Test Name', jobTitle: 'Job Title', resumeId: res.body.resume.id}})
        .expect(200);

    const result = await db.Candidate.findAll({});
    expect(result.length === 1).toBeTruthy();
    expect(result[0].name === 'Test Name').toBeTruthy();
});

test('it should fetch candidates with pagination', async function () {
    await db.Resume.bulkCreate([{
        fileName: 'cv1.pdf',
        fileType: '.pdf',
        fileData: Buffer.from('anything'),
        createdAt: new Date(),
        updatedAt: new Date(),
    }]);

    expect(await db.Resume.count({}) === 1).toBeTruthy();

    for (let i = 0; i < 35; i++) {
        await db.Candidate.create({
            name: 'Test ' + i,
            jobTitle: 'Job ' + i,
            resumeId: 1
        });
    }

    expect(await db.Candidate.count({}) === 35).toBeTruthy();

    const res = await request(app)
        .get('/api/candidates?page=3&size=15')
        .expect(200);

    expect(res.body.totalItems === 35).toBeTruthy();
    expect(res.body.currentPage === 3).toBeTruthy();
    expect(res.body.candidates.length === 5).toBeTruthy();
});

test('it should show bonus message after 10 submissions', async () => {
    await db.Resume.bulkCreate([{
        fileName: 'cv1.pdf',
        fileType: '.pdf',
        fileData: Buffer.from('anything'),
        createdAt: new Date(),
        updatedAt: new Date(),
    }]);

    const source = "TEST_UPLOAD_SOURCE";

    for (let i = 0; i < 9; i++) {
        await db.Candidate.create({
            name: 'Test ' + i,
            jobTitle: 'Job ' + i,
            resumeId: 1,
            source
        });
    }

    const res = await request(app)
        .post('/api/candidate')
        .send({candidate: {name: 'Test Name', jobTitle: 'Job Title', resumeId: 1, source}})
        .expect(200);

    expect(res.body.bonusMessage === config.bonusAwardMessage).toBeTruthy();

    const res2 = await request(app)
        .post('/api/candidate')
        .send({candidate: {name: 'Test Name', jobTitle: 'Job Title', resumeId: 1, source}})
        .expect(200);

    expect(res2.body.bonusMessage).toBeUndefined();
});

import express from 'express'
import path from "path"
import config from "./config.js"

const router = express.Router()

router
    .get('/', (req, res) => {
        res.sendFile(path.join(config.clientSideAppPath, 'index.html'))
    })
    .get('/api/users', (req, res) => {
        console.log('api/users called!!!!!!!')
        res.json({message: 'no users!'});
    })
    .post('/api/user', (req, res) => {
        res.json({message: 'user not added'});
    })

export default router

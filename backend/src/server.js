import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes.js'
import config from './config.js'

const app = express()

app.use(bodyParser.json());
app.use(express.static(config.clientSideAppPath))
app.use('/', routes)

app.listen(config.port, () => {
    console.log(`Server listening on the port::${config.port}`);
});

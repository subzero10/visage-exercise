const path = require('path');

module.exports = {
    port: process.env.PORT || 3080,
    clientSideAppPath: path.join(path.resolve(), '../frontend/dist'),
    dbUrl: process.env.DATABASE_URL,
    defaultPageSize: 15,
    maxUploadSize: 10485760, //10mb
    bonusAwardMessage: "Every day feels like I've died and gone to hell"
}

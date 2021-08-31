import path from 'path'

export default {
    port: process.env.PORT || 3080,
    clientSideAppPath: path.join(path.resolve(), '../frontend/dist')
}

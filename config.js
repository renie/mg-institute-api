import dotenv from 'dotenv'

const env = process.env.NODE_ENV

if (env !== 'prod') {
    const fileToLoad = env === 'dev' ? './.env' : './.env-test'
    dotenv.config({ path: fileToLoad })
}

const config = {
    NODEENV: process.env.NODE_ENV,
    APPPORT: process.env.APPPORT,
    ADDRESSDB: process.env.ADDRESSDB,
    USERDB: process.env.USERDB,
    PASSDB: process.env.PASSDB,
    NAMEDB: process.env.NAMEDB,
    PARAMSDB: process.env.PARAMSDB
}

export default config

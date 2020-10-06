import dotenv from 'dotenv'
import fs from 'fs'
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
    PARAMSDB: process.env.PARAMSDB,
    FRONTENDADDRESS: process.env.FRONTENDADDRESS,
    HTTPSKEYFILE: process.env.HTTPSKEYFILE,
    HTTPSCERTFILE: process.env.HTTPSCERTFILE
}

const getHTTPOptions = () => ({
    key: fs.readFileSync(config.HTTPSKEYFILE),
    cert: fs.readFileSync(config.HTTPSCERTFILE)
})

config.HTTPOPTIONS = getHTTPOptions()


export default config

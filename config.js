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
    HTTPSCERTFILE: process.env.HTTPSCERTFILE,
    SALTROUNDS: process.env.SALTROUNDS,
    SECRETKEYHMAC: process.env.SECRETKEYHMAC,
    JWTDEVTOKEN: process.env.JWTDEVTOKEN || false,
    VIMEO_CLIENTID: process.env.VIMEO_CLIENTID,
    VIMEO_CLIENTSECRET: process.env.VIMEO_CLIENTSECRET,
    VIMEO_ACCESSTOKEN: process.env.VIMEO_ACCESSTOKEN
}

const getHTTPOptions = () => ({
    key: config.HTTPSKEYFILE ? fs.readFileSync(config.HTTPSKEYFILE) : '',
    cert: config.HTTPSCERTFILE ? fs.readFileSync(config.HTTPSCERTFILE) : ''
})

config.HTTPOPTIONS = getHTTPOptions()


export default config

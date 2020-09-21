import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') dotenv.config()

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

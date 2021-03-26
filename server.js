import https from 'https'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { setAllRoutes } from './routes/main'
import logger from './logger'
import error from './error'
import config from './config'


global.logger = logger
global.ThrowError = error

const defaultPort = config.APPPORT

const logURLMappings = (expressInstance) => expressInstance._router.stack.
    filter((r) => r.route).
    map((r) => r.route).
    map((r) => `${r.path} - ${r.stack[0].method} - ${r.stack[0].name}`).
    forEach((r) => logger.notice(r))

const configureInstance = (expressInstance, corsOptions) => {
    expressInstance.use(bodyParser.json())
    expressInstance.use(helmet())
    expressInstance.use(cookieParser())
    expressInstance.use(cors(corsOptions))

    expressInstance.enable('trust proxy')
    expressInstance.disable('etag')

    return expressInstance
}

const getExpressInstance = () => configureInstance(express(), { origin: config.FRONTENDADDRESS })

const startServer = (expressInstance, port = defaultPort) => {
    logURLMappings(expressInstance)
    const server = https.createServer(config.HTTPOPTIONS, expressInstance)
    server.listen(port, () => logger.info(`MGIntitute API Server listening at port ${port}...`))
    return server
}

const startApp = () => startServer(setAllRoutes(getExpressInstance()))

module.exports = startApp

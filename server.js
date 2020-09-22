import express from 'express'
import bodyParser from 'body-parser'

import { setAllRoutes } from './routes/mainRouter'
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
    forEach((r) => logger.verbose(r))


const getExpressInstance = (expressLib) => {
    const instance = expressLib()
    instance.use(bodyParser.json())
    return instance
}

export const startServer = (expressInstance, port = defaultPort) => {
    logURLMappings(expressInstance)
    expressInstance.listen(port, () => logger.info(`MGIntitute API Server listening at port ${port}...`))
    return expressInstance
}

const startApp = ({
    expressLib,
    setRouteFn,
    port
} = {
    expressLib: express,
    setRouteFn: setAllRoutes,
    port: defaultPort
}) => startServer(setRouteFn(getExpressInstance(expressLib)), port)

module.exports = startApp

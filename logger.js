import path from 'path'
import { createLogger, format, transports } from 'winston'
import config from './config'


const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp, meta }) => {
    const metaData = meta ? JSON.stringify(meta) : ''
    return `[${level}] [${timestamp}]: ${message} ${metaData}`;
});

const logger = createLogger({
    format: format.json(),
    transports: [
        new transports.File({ filename: path.join(__dirname, 'logs', 'error.log'), level: 'error' }),
        new transports.File({ filename: path.join(__dirname, 'logs', 'combined.log'), level: 'verbose' }),
        new transports.File({ filename: path.join(__dirname, 'logs', 'combined.log'), level: 'warn' })
    ],
    exitOnError: false
})

if (config.NODEENV !== 'production') {
    logger.add(new transports.Console({
        format: combine(
            format.colorize(),
            timestamp(),
            myFormat
        )
    }))
}

export default logger

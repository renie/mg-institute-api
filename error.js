const ThrowError = (message, meta) => {
    logger.error(message, { meta })
    throw Error(message)
}

export default ThrowError
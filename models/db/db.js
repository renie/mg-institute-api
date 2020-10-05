import mongoose from 'mongoose'

import config from '../../config'


let database = false

export const connect = async () => {
    const URI = `mongodb+srv://${config.USERDB}:${config.PASSDB}@${config.ADDRESSDB}/${config.NAMEDB}?${config.PARAMSDB}`

    try {
        database = await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (err) {
        ThrowError('DB Connection Error', { meta: err })
    }
}

export const getConnection = async () => {
    if (database) return database
    await connect()
}

export const getModel = async ({model, schema, collectionName}) => {
    await getConnection()
    return database.models[model] || database.model(model, schema, collectionName)
}

export const MONGOOSE_ERROR_TYPE = mongoose.Error.ValidationError

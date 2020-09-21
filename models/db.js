import { MongoClient } from 'mongodb'
import config from '../config'


let database = false

export const connect = async () => {
    const URI = `mongodb+srv://${config.USERDB}:${config.PASSDB}@${config.ADDRESSDB}/?${config.PARAMSDB}`

    try {
        const conn = await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        database = conn.db(config.NAMEDB)
        return database
    } catch (err) {
        ThrowError('DB Connection Error', { meta: err })
    }
}

export const getConnection = async () => {
    if (database) return database
    await connect()
}

export const getCollection = async (collectionName) => {
    await getConnection()
    return database.collection(collectionName)
}

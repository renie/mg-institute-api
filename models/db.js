import { MongoClient } from 'mongodb'


let database = false

export const connect = async () => {
    const URI = `mongodb+srv://${process.env.USERDB}:${process.env.PASSDB}@${process.env.ADDRESSDB}/?${process.env.PARAMSDB}`

    try {
        const conn = await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
        return conn.db(process.env.NAMEDB)
    } catch (err) {
        ThrowError('DB Connection Error', { meta: err })
    }
}

export const getConnection = async () => {
    if (database) return database
    return database = await connect()
}

export const getCollection = async (collectionName) => {
    const conn = await getConnection()
    return conn.collection(collectionName)
}
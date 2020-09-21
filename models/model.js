import { ObjectID } from 'mongodb'
import { getCollection } from './db'


export const parseValue = (key, value) => {
    if (key !== '_id') return value
    return ObjectID(value)
}

export const save = async (objectToSave, validationFn, entity) =>  {
    if (!validationFn(objectToSave)) ThrowError(`Invalid ${entity} object`, { meta: entity })

    try {
        const db = await getCollection(entity)
        const { insertedId } = await db.insertOne(objectToSave)
        logger.info(`${entity} created`, { meta: insertedId })
        return insertedId
    } catch (err) {
        ThrowError(`${entity} not created`, { meta: {objectToSave, err} })
    }
}

export const getAll = async (entity) => {
    const db = await getCollection(entity)
    return await db.find().toArray()
}

export const getOne = async (key, value, entity) => {
    const db = await getCollection(entity)
    const result = await db.findOne({[key]: parseValue(key, value)})
    return result
}
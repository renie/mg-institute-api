import { ObjectID } from 'mongodb'
import { getCollection } from './db'

const ID = '_id'

export const isId = (key) => key === ID

export const parseValue = (key, value) => (!isId(key) ? value : ObjectID(value))

export const removeId = (object) => {
    const {[ID]:_, ...noIdObject } = object
    return noIdObject
}

export const isValidProperty = (key, value) => (!isId(key) || ObjectID.isValid(value))

export const save = async (objectToSave, validationFn = () => true, entity) =>  {
    const object = removeId(objectToSave)

    if (!validationFn(object)) ThrowError(`Invalid ${entity} object`, { meta: entity })

    try {
        const db = await getCollection(entity)
        const { insertedId } = await db.insertOne(object)
        logger.info(`${entity} created`, { meta: insertedId })
        return insertedId
    } catch (err) {
        ThrowError(`${entity} not created`, { meta: {object, err} })
    }
}

export const getAll = async (entity) => {
    const db = await getCollection(entity)
    return await db.find().toArray()
}

export const getOne = async (key, value, entity) => {
    if (!isValidProperty(key, value)) return null

    const db = await getCollection(entity)
    const result = await db.findOne({[key]: parseValue(key, value)})
    return result
}
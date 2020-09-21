import { getCollection } from './db'
import { removeId, isValidProperty, parseValue } from './helpers'


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
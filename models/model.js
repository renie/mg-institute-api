import { getCollection } from './db'
import { ID, removeId, isValidProperty, parseValue } from './helpers'


export const save = async (objectToSave, validationFn = () => true, entity) =>  {
    const object = removeId(objectToSave)

    if (!validationFn(object)) ThrowError(`Invalid ${entity} object (create)`, { meta: entity })

    object.lastUpdate = new Date()

    try {
        const db = await getCollection(entity)
        const { insertedId } = await db.insertOne(object)
        logger.info(`${entity} created`, { meta: insertedId })
        return insertedId
    } catch (err) {
        ThrowError(`${entity} not created`, { meta: {object, err} })
    }
}

export const getAll = async (query, entity) => {
    const db = await getCollection(entity)
    return await db.find(query).toArray()
}

export const getOne = async (key, value, entity) => {
    if (!isValidProperty(key, value)) return null

    const db = await getCollection(entity)
    const result = await db.findOne({[key]: parseValue(key, value)})
    return result
}

export const replace = async (id, newObject, validationFn = () => true, entity) => {
    const object = removeId(newObject)

    if (!validationFn(object)) ThrowError(`Invalid ${entity} object (replace)`, { meta: entity })
    if (!isValidProperty(ID, id)) return null

    const query = { [ID]: parseValue(ID, id) }

    try {
        const db = await getCollection(entity)
        const { modifiedCount } = await db.replaceOne(query, object)

        if (modifiedCount){
            await db.updateOne(query, {$currentDate: {lastModified: true}})
            logger.info(`${entity} replaced`, { meta: id })
        }

        return modifiedCount
    } catch (err) {
        ThrowError(`${entity} not replaced`, { meta: {id, object, err} })
    }
}

export const update = async (id, newValues, validationFn = () => true, entity) => {
    const object = removeId(newValues)

    if (!validationFn(object)) ThrowError(`Invalid ${entity} object (update)`, { meta: entity })
    if (!isValidProperty(ID, id)) return null

    const query = { [ID]: parseValue(ID, id) }

    try {
        const db = await getCollection(entity)
        const { modifiedCount } = await db.updateOne(query, {$currentDate: {lastModified: true}, $set: object})

        if (modifiedCount) logger.info(`${entity} updated`, { meta: id })

        return modifiedCount
    } catch (err) {
        ThrowError(`${entity} not updated`, { meta: {id, object, err} })
    }
}

export const remove = async (id, entity) => {
    if (!isValidProperty(ID, id)) return null

    const db = await getCollection(entity)
    const { deletedCount } = await db.deleteOne({[ID]: parseValue(ID, id)})
    return deletedCount
}
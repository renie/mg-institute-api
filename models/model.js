import { getModel, MONGOOSE_ERROR_TYPE } from './db/db'
import { ID, removeId, isValidProperty, parseValue } from './helpers'


export const save = async (objectToSave, entity) =>  {
    const object = removeId(objectToSave)

    try {
        const model = await getModel(entity)
        await model.validate(object)
        const newDocument = await model(object)
        const { _id } = await newDocument.save()
        logger.info(`${entity.model} created`, { meta: _id })
        return _id
    } catch (err) {
        if (err instanceof MONGOOSE_ERROR_TYPE) ThrowError(`${entity.model} not created`, { meta: {object, err: err.errors} })
        ThrowError(`${entity.model} not created`, { meta: {object, err} })
    }
}

export const getAll = async (query, entity) => {
    const model = await getModel(entity)
    return await model.find(query)
}

export const getOne = async (key, value, entity) => {
    if (!isValidProperty(key, value)) return null

    const db = await getModel(entity)
    return await db.findOne({[key]: parseValue(key, value)})
}

export const replace = async (id, newObject, entity) => {
    const object = removeId(newObject)

    if (!isValidProperty(ID, id)) return null

    const query = { [ID]: parseValue(ID, id) }

    try {
        const model = await getModel(entity)
        await model.validate(object)

        const { nModified } = await model.replaceOne(query, object)

        if (nModified){
            await model.updateOne(query, {$currentDate: {lastModified: true}})
            logger.info(`${entity.model} replaced`, { meta: id })
        }

        return nModified
    } catch (err) {
        if (err instanceof MONGOOSE_ERROR_TYPE) ThrowError(`${entity.model} not replaced`, { meta: {id, object, err: err.errors} })
        ThrowError(`${entity.model} not replaced`, { meta: {id, object, err} })
    }
}

export const update = async (id, newValues, entity) => {
    const object = removeId(newValues)

    if (!isValidProperty(ID, id)) return null
    const query = { [ID]: parseValue(ID, id) }


    try {
        const model = await getModel(entity)

        const { nModified } = await model.updateOne(query, {$currentDate: {lastModified: true}, $set: object})

        if (nModified) logger.info(`${entity.model} updated`, { meta: id })

        return nModified
    } catch (err) {
        if (err instanceof MONGOOSE_ERROR_TYPE) ThrowError(`${entity.model} not updated`, { meta: {id, object, err: err.errors} })
        ThrowError(`${entity.model} not updated`, { meta: {id, object, err} })
    }
}

export const remove = async (id, entity) => {
    if (!isValidProperty(ID, id)) return null

    const model = await getModel(entity)
    const { deletedCount } = await model.deleteOne({[ID]: parseValue(ID, id)})
    return deletedCount
}

import { getModel, MONGOOSE_ERROR_TYPE } from './db/db'
import { ID, removeId, isValidProperty, parseValue } from './helpers'

// PRIVATE
const _execReplace = async ({object, query, id, model, entity}) => {
    await model.validate(object)
    const { nModified } = await model.replaceOne(query, object)

    if (nModified) {
        await model.updateOne(query, {$currentDate: {lastModified: true}})
        logger.info(`${entity.model} replaced`, {meta: id})
    }

    return nModified
}

const _execUpdate = async ({object, query, id, model, entity}) => {
    const { nModified } = await model.updateOne(query, {$currentDate: {lastModified: true}, $set: object})
    if (nModified) logger.info(`${entity.model} updated`, {meta: id})
    return nModified
}

const _execModification = async (params, operation) => (operation === 'replace' ? await _execReplace(params) : await _execUpdate(params))

const _saveNewVersion = async (id, newThings, entity, operation) => {
    const object = removeId(newThings)

    if (!isValidProperty(ID, id)) return null

    const query = { [ID]: parseValue(ID, id) }

    try {
        const model = await getModel(entity)
        return await _execModification({object, query, id, model, entity}, operation)
    } catch (err) {
        if (err instanceof MONGOOSE_ERROR_TYPE) ThrowError(`${entity.model} not ${operation}d`, { meta: {id, object, err: err.errors} })
        ThrowError(`${entity.model} not ${operation}d`, { meta: {id, object, err} })
    }
}
// PRIVATE END

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

export const replace = async (id, newObject, entity) => await _saveNewVersion(id, newObject, entity, 'replace')

export const update = async (id, newValues, entity) => await _saveNewVersion(id, newValues, entity, 'update')

export const remove = async (id, entity) => {
    if (!isValidProperty(ID, id)) return null

    const model = await getModel(entity)
    const { deletedCount } = await model.deleteOne({[ID]: parseValue(ID, id)})
    return deletedCount
}

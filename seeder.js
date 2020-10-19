import { getModel } from './models/db/db'
import { seeds } from './models/db/seeds'
import logger from './logger'


const hasForceSeedParam = () => process.argv.includes('--forceseed')

const hasForceDropParam = () => process.argv.includes('--forcedrop')

const hasDocuments = async (model) => await model.countDocuments()

const dropCollection = async (model, collectionName) => {
    logger.info(`Dropping ${collectionName} collection.`)
    await model.drop()
}

// eslint-disable-next-line func-style
async function saveChildren (document) {
    const savedChildren = await Promise
        .all(Object
            .keys(document)
            .filter(key => typeof document[key] === 'object')
            .filter(key => document[key].hasOwnProperty('entity'))
            .map(async (key) => ({ key, value: await workOnCollection(document[key])})))

    if (!savedChildren.length) return document

    const documentCopy = {...document}

    savedChildren.forEach((prop) => {
        documentCopy[prop.key] = prop.value
    })

    return documentCopy
}

// eslint-disable-next-line func-style
async function insertCollection (model, collectionName, documents) {
    logger.info(`Adding ${documents.length} to ${collectionName} collection.`)
    try {
        const documentWithChildrenId = await Promise.all(documents.map(saveChildren))

        const insertedDocs = await model.insertMany(documentWithChildrenId)
        logger.info(`A total of ${insertedDocs.length} had been added to ${collectionName} collection.`)
        return Promise.resolve(insertedDocs.map(item => item._doc))
    } catch (e) {
        return Promise.reject(e)
    }
}

// eslint-disable-next-line func-style
async function workOnCollection (collection) {
    logger.info(`Seeding ${collection.entity.model} collection...`)
    try {
        const model = await getModel(collection.entity)
        if (await hasDocuments(model)) {
            if (!hasForceSeedParam()) {
                logger.info(`Not seeding ${collection.entity.model} collection. It already contains documents. (If you want it so, run 'npm run [task] -- --forceseed')`)
                return Promise.resolve()
            }

            if (hasForceDropParam()) {
                await dropCollection(model, collection.entity.model)
            } else {
                logger.info(`Not dropping ${collection.entity.model} collection. (If you want it so, run 'npm run [task] -- --forcedrop')`)
            }
        }


        const result = await insertCollection(model, collection.entity.model, collection.data)
        const newCount = await hasDocuments(model)

        logger.info(`The ${collection.entity.model} collection now has ${newCount} documents.\n`)
        return Promise.resolve(result._docs ? result._docs.map(({_id}) => _id) : result)
    } catch (e) {
        logger.error(e)
        return Promise.reject(e)
    }
}

module.exports = () => {
    logger.info('Seeder started\n')
    Promise
        .all(seeds.map(workOnCollection))
        .then(() => logger.info('Seed completed'))
        .catch((err) => logger.error(err))
        .finally(() => process.exit())
}

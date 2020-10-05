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

const insertCollection = async (model, collectionName, documents) => {
    logger.info(`Adding ${documents.length} to ${collectionName} collection.`)
    const insertedDocs = await model.insertMany(documents)
    logger.info(`A total of ${insertedDocs.length} had been added to ${collectionName} collection.`)
}

const workOnCollection = async (collection) => {
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

        await insertCollection(model, collection.entity.model, collection.data)

        const newCount = await hasDocuments(model)

        logger.info(`The ${collection.entity.model} collection now has ${newCount} documents.\n`)
    } catch (e) {
        logger.error(e)
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

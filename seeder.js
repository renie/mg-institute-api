import { getCollection } from './models/db/db'
import { seeds } from './models/db/seeds'
import logger from './logger'


const hasForceSeedParam = () => process.argv.includes('--forceseed')

const hasForceDropParam = () => process.argv.includes('--forcedrop')

const hasDocuments = async (collection) => await collection.countDocuments()

const dropCollection = async (collection, collectionName) => {
    logger.info(`Dropping ${collectionName} collection.`)
    await collection.drop()
}

const insertCollection = async (collection, collectionName, documents) => {
    logger.info(`Adding ${documents.length} to ${collectionName} collection.`)
    const {insertedCount} = await collection.insertMany(documents)
    logger.info(`A total of ${insertedCount} had been added to ${collectionName} collection.`)
}

const workOnCollection = async ([collectionName, documents]) => {
    logger.info(`Seeding ${collectionName.toUpperCase()} collection...`)
    const collection = await getCollection(collectionName)

    if (await hasDocuments(collection)){
        if (!hasForceSeedParam()) {
            logger.info(`Not seeding ${collectionName} collection. It already contains documents. (If you want it so, run 'npm run [task] -- --forceseed')`)
            return Promise.resolve()
        }

        if (hasForceDropParam()){
            await dropCollection(collection, collectionName)
        } else {
            logger.info(`Not dropping ${collectionName} collection. (If you want it so, run 'npm run [task] -- --forcedrop')`)
        }
    }

    await insertCollection(collection, collectionName, documents)
    const newCount = await hasDocuments(collection)
    logger.info(`The ${collectionName} collection now has ${newCount} documents.\n`)
}

module.exports = () => {
    logger.info('Seeder started\n')
    Promise
        .all(Object.entries(seeds).map(workOnCollection))
        .then(() => logger.info('Seed completed'))
        .catch((err) => logger.error(err))
        .finally(() => process.exit())
}

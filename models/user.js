import { 
    save as genericSave,
    getAll as genericGetAll,
    getOne as genericGetOne } from './model'
import { isValid } from './validations/user'


const entity = 'user'

export const save = async (user) => await genericSave(user, isValid, entity)

export const getAll = async () => await genericGetAll(entity)

export const getOne = async (key, value) => await genericGetOne(key, value, entity)

export default { save, getAll, getOne }
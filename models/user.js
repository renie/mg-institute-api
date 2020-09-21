import { 
    save as genericSave,
    getAll as genericGetAll,
    getOne as genericGetOne,
    replace as genericReplace } from './model'
import { isValid } from './validations/user'


const entity = 'user'

export const save = async (user) => await genericSave(user, isValid, entity)

export const getAll = async () => await genericGetAll(entity)

export const getOne = async (key, value) => await genericGetOne(key, value, entity)

export const replace = async (id, newUser) => await genericReplace(id, newUser, isValid, entity)

export default { save, getAll, getOne, replace }
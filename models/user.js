import {
    save as genericSave,
    getAll as genericGetAll,
    getOne as genericGetOne,
    replace as genericReplace,
    update as genericUpdate,
    remove as genericRemove } from './model'


export const USER = {
    model: 'User',
    schema: {
        name: { type: String, required: true },
        age: { type: Number },
        lastUpdate: { type: Date, default: Date.now }
    }
}

export const save = async (user) => await genericSave(user, USER)

export const getAll = async (query) => await genericGetAll(query, USER)

export const getOne = async (key, value) => await genericGetOne(key, value, USER)

export const replace = async (id, newUser) => await genericReplace(id, newUser, USER)

export const update = async (id, newValues) => await genericUpdate(id, newValues, USER)

export const remove = async (id) => await genericRemove(id, USER)


export default { save, getAll, getOne, replace, update, remove }

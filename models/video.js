import {
    getAll as genericGetAll,
    getOne as genericGetOne, remove as genericRemove,
    replace as genericReplace,
    save as genericSave, update as genericUpdate
} from "./model"

export const VIDEO = {
    model: 'Video',
    schema: {
        name: {type: String, required: true},
        url: {type: String, required: true},
        lastUpdate: {type: Date, default: Date.now}
    }
}

export const save = async (video) => await genericSave(video, VIDEO)

export const getAll = async (query) => await genericGetAll(query, VIDEO)

export const getOne = async (key, value) => await genericGetOne(key, value, VIDEO)

export const replace = async (id, video) => await genericReplace(id, video, VIDEO)

export const update = async (id, newValues) => await genericUpdate(id, newValues, VIDEO)

export const remove = async (id) => await genericRemove(id, VIDEO)

export default { save, getAll, getOne, replace, update, remove }

import { Schema } from 'mongoose'
import {
    getAll as genericGetAll,
    getOne as genericGetOne, remove as genericRemove,
    replace as genericReplace,
    save as genericSave, update as genericUpdate
} from "./model"
import {
    saveMultiple as saveVideos,
    VIDEO
} from "./video"

export const COURSE = {
    model: 'Course',
    schema: {
        title: {type: String, required: true},
        videos: [{type: Schema.Types.ObjectId, ref: VIDEO}],
        lastUpdate: {type: Date, default: Date.now}
    }
}

export const save = async (course) => {
    const newCourse = {...course}
    if (newCourse.videos.length) newCourse.videos = await saveVideos(newCourse.videos)

    return await genericSave(newCourse, COURSE)
}

export const getAll = async (query) => await genericGetAll(query, COURSE)

export const getOne = async (key, value) => await genericGetOne(key, value, COURSE)

export const replace = async (id, course) => await genericReplace(id, course, COURSE)

export const update = async (id, newValues) => await genericUpdate(id, newValues, COURSE)

export const remove = async (id) => await genericRemove(id, COURSE)

export default { save, getAll, getOne, replace, update, remove }

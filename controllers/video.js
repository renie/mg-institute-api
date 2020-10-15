import {
    findById as genericFindById,
    fullUpdate as genericFullUpdate,
    listAll as genericListAll, partialUpdate as genericPartialUpdate, remove as genericRemove,
    save as genericSave
} from "./controller"
import Video from "../models/video"

export const save = async (req, res) => await genericSave(req, res, Video)

export const findById = async (req, res) => await genericFindById(req, res, Video)

export const listAll = async (req, res) => await genericListAll(req, res, Video)

export const fullUpdate = async (req, res) => await genericFullUpdate(req, res, Video)

export const partialUpdate = async (req, res) => await genericPartialUpdate(req, res, Video)

export const remove = async (req, res) => await genericRemove(req, res, Video)

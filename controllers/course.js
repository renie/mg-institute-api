import {
    findById as genericFindById,
    fullUpdate as genericFullUpdate,
    listAll as genericListAll, partialUpdate as genericPartialUpdate, remove as genericRemove,
    save as genericSave
} from "./controller"
import Course from "../models/course"

export const save = async (req, res) => await genericSave(req, res, Course)

export const findById = async (req, res) => await genericFindById(req, res, Course)

export const listAll = async (req, res) => await genericListAll(req, res, Course)

export const fullUpdate = async (req, res) => await genericFullUpdate(req, res, Course)

export const partialUpdate = async (req, res) => await genericPartialUpdate(req, res, Course)

export const remove = async (req, res) => await genericRemove(req, res, Course)

import {
    save as genericSave,
    findById as genericFindById,
    listAll as genericListAll,
} from './controller'
import User from '../models/user'


export const save = async (req, res) => await genericSave(req, res, User)

export const findById = async (req, res) => await genericFindById(req, res, User)

export const listAll = async (_, res) => await genericListAll(res, User)
import {
    save as genericSave,
    findById as genericFindById,
    listAll as genericListAll,
    fullUpdate as genericFullUpdate,
    partialUpdate as genericPartialUpdate,
} from './controller'
import User from '../models/user'


export const save = async (req, res) => await genericSave(req, res, User)

export const findById = async (req, res) => await genericFindById(req, res, User)

export const listAll = async (_, res) => await genericListAll(res, User)

export const fullUpdate = async (req, res) => await genericFullUpdate(req, res, User)

export const partialUpdate = async (req, res) => await genericPartialUpdate(req, res, User)
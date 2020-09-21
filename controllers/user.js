import {
    save as genericSave,
    findById as genericFindById,
    listAll as genericListAll,
    fullUpdate as genericFullUpdate,
    partialUpdate as genericPartialUpdate,
    remove as genericRemove, } from './controller'
import User from '../models/user'


export const save = async (req, res) => await genericSave(req, res, User)

export const findById = async (req, res) => await genericFindById(req, res, User)

export const listAll = async (req, res) => await genericListAll(req, res, User)

export const fullUpdate = async (req, res) => await genericFullUpdate(req, res, User)

export const partialUpdate = async (req, res) => await genericPartialUpdate(req, res, User)

export const remove = async (req, res) => await genericRemove(req, res, User)
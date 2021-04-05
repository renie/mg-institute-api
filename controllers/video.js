import { StatusCodes } from 'http-status-codes'

import {
    findById as genericFindById,
    fullUpdate as genericFullUpdate,
    listAll as genericListAll, partialUpdate as genericPartialUpdate, remove as genericRemove,
    save as genericSave
} from "./controller"
import Video from "../models/video"
import { vimeoRequest } from "../utils/vimeo-async"


export const save = async (req, res) => await genericSave(req, res, Video)

export const findById = async (req, res) => await genericFindById(req, res, Video)

export const listAll = async (req, res) => await genericListAll(req, res, Video)

export const fullUpdate = async (req, res) => await genericFullUpdate(req, res, Video)

export const partialUpdate = async (req, res) => await genericPartialUpdate(req, res, Video)

export const remove = async (req, res) => await genericRemove(req, res, Video)

export const getVideoThumbURL = async (req, res) => {
    try {
        const { pictures } = await vimeoRequest({ path: `/videos/${req.params.id}` })
        const { sizes } = await vimeoRequest({ path: pictures.uri })
        res.status(StatusCodes.OK).send(sizes[sizes.length - 1].link)
    } catch (e) {
        logger.error(e)
        res.status(StatusCodes.SERVICE_UNAVAILABLE).send(e)
    }
}

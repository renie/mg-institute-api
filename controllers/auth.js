import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

import config from '../config'
import User from "../models/user"

export const login = async (req, res) => {
    try {
        const user = await User.checkPass(req.body)
        if (user.logged) {
            res.status(StatusCodes.UNAUTHORIZED).send({data: "User already logged"})
            return false
        }

        await User.update(user._id, { logged: true })
        res.status(StatusCodes.OK).send({ auth: true, token: User.genToken(user) })
    } catch {
        res.status(StatusCodes.UNAUTHORIZED).send()
    }
}

export const logout = async (req, res) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send({ auth: false, message: 'No token provided.' })
    const { id } = await jwt.verify(token, config.SECRETKEYHMAC)
    await User.update(id, { logged: false })
    res.status(StatusCodes.OK).send({ auth: false, token: null })
}

export const verifyToken = async (req, res, next) => {
    const token = req.headers['x-access-token']
    if (!token) return res.status(StatusCodes.UNAUTHORIZED).send({ auth: false, message: 'No token provided.' })

    try {
        const { id } = await jwt.verify(token, config.SECRETKEYHMAC)
        const user = await User.getOne('_id', id)
        if (!user.logged) return res.status(StatusCodes.UNAUTHORIZED).send({ auth: false, message: 'Failed to authenticate token.' })
        return next()
    } catch {
        res.status(StatusCodes.UNAUTHORIZED).send({ auth: false, message: 'Failed to authenticate token.' })
    }
}
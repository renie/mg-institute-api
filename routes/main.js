import {
    rootRoutes,
    notFoundRoutes,
    genericErrorFunction
} from './general'
import { userRoutes } from './user'
import { videoRoutes } from './video'
import { courseRoutes } from './course'
import { authRoutes } from './auth'
import { verifyToken } from '../controllers/auth'


export const setRoute = (route, expressInstance, genericErrorFn = genericErrorFunction) => {
    if (route.auth) expressInstance[route.method](route.url, verifyToken, route.fn, route.errorFn || genericErrorFn)
    else expressInstance[route.method](route.url, route.fn, route.errorFn || genericErrorFn)

    return expressInstance
}

export const setAllRoutes = (
    expressInstance,
    routes = [
        ...rootRoutes,
        ...userRoutes,
        ...videoRoutes,
        ...courseRoutes,
        ...authRoutes,

        ...notFoundRoutes
    ]
) => {
    routes.forEach((route) => setRoute(route, expressInstance))
    return expressInstance
}

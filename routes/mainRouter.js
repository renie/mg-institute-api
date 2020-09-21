import {
    rootRoutes,
    notFoundRoutes,
    genericErrorFunction
} from './generalRoutes'
import { userRoutes } from './userRoutes'


export const setRoute = (route, expressInstance, genericErrorFn = genericErrorFunction) => {
    expressInstance[route.method](route.url, route.fn, route.errorFn || genericErrorFn)
    return expressInstance
}

export const setAllRoutes = (
    expressInstance, 
    routes = [
        ...rootRoutes,
        ...userRoutes,

        ...notFoundRoutes
    ]
) => {
    routes.forEach(route => setRoute(route, expressInstance))
    return expressInstance
}

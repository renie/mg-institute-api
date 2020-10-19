import {
    save,
    listAll,
    findById,
    fullUpdate,
    partialUpdate,
    remove } from '../controllers/course'

export const courseRoutes = [
    {
        method: 'post',
        url: '/api/course',
        fn: save,
        auth: true
    },
    {
        method: 'get',
        url: '/api/course',
        fn: listAll,
        auth: true
    },
    {
        method: 'get',
        url: '/api/course/:id',
        fn: findById,
        auth: true
    },
    {
        method: 'put',
        url: '/api/course/:id',
        fn: fullUpdate,
        auth: true
    },
    {
        method: 'patch',
        url: '/api/course/:id',
        fn: partialUpdate,
        auth: true
    },
    {
        method: 'delete',
        url: '/api/course/:id',
        fn: remove,
        auth: true
    }
]

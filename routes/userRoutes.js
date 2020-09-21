import {
    save,
    listAll,
    findById,
    fullUpdate,
    partialUpdate,
    remove, } from '../controllers/user'


export const userRoutes = [
    {
        method: 'post',
        url: '/api/user',
        fn: save
    },
    {
        method: 'get',
        url: '/api/user',
        fn: listAll
    },
    {
        method: 'get',
        url: '/api/user/:id',
        fn: findById
    },
    {
        method: 'put',
        url: '/api/user/:id',
        fn: fullUpdate
    },
    {
        method: 'patch',
        url: '/api/user/:id',
        fn: partialUpdate
    },
    {
        method: 'delete',
        url: '/api/user/:id',
        fn: remove
    },
]

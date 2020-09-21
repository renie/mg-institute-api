import { save, listAll, findById, fullUpdate } from '../controllers/user'


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
]

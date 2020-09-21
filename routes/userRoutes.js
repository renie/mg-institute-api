import { save, listAll, findById } from '../controllers/user'


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
    }
]

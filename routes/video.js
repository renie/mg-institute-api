import {
    save,
    listAll,
    findById,
    fullUpdate,
    partialUpdate,
    remove,
    getVideoThumbURL } from '../controllers/video'

export const videoRoutes = [
    {
        method: 'post',
        url: '/api/video',
        fn: save,
        auth: true
    },
    {
        method: 'get',
        url: '/api/video',
        fn: listAll,
        auth: true
    },
    {
        method: 'get',
        url: '/api/video/:id',
        fn: findById,
        auth: true
    },
    {
        method: 'put',
        url: '/api/video/:id',
        fn: fullUpdate,
        auth: true
    },
    {
        method: 'patch',
        url: '/api/video/:id',
        fn: partialUpdate,
        auth: true
    },
    {
        method: 'delete',
        url: '/api/video/:id',
        fn: remove,
        auth: true
    },
    {
        method: 'get',
        url: '/api/video/vimeothumbof/:id',
        fn: getVideoThumbURL,
        auth: true
    }
]

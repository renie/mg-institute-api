import {
    login,
    logout } from '../controllers/auth'


export const authRoutes = [
    {
        method: 'post',
        url: '/api/login',
        fn: login
    },
    {
        method: 'post',
        url: '/api/logout',
        fn: logout
    }
]

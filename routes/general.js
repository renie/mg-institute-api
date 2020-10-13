export const rootRoutes = [
    {
        method: 'get',
        url: '/api',
        fn: (_, res) => res.send('Root')
    }
]

export const notFoundRoutes = [
    {
        method: 'get',
        url: '*',
        fn: (_, res) => res.status('404').send('Page not found!')
    }
]

export const genericErrorFunction = (_, res) => res.status('500').send('Error: Last error layer. We will work on that.')

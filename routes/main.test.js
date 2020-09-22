import assert from 'assert'
import { setRoute, setAllRoutes } from './main'


describe('Main Router', () => {

    describe('setRoute', () => {

        let returnTest = false

        const route = {
            method: 'get',
            url: 'users',
            fn: () => {
                returnTest = true
            }
        }

        const mockExpressInstance = {
            routes: [],
            get: (url, fn) => {
                mockExpressInstance.routes.push({url, fn})
            }
        }

        it('should add route to express instance', () => {
            setRoute(route, mockExpressInstance)

            assert.notDeepEqual(mockExpressInstance.routes, [])
            mockExpressInstance.routes[0].fn()

            assert.equal(mockExpressInstance.routes[0].url, route.url)
            assert.ok(returnTest)
        })

    })

    describe('setAllRoutes', () => {

        let returnTest1 = false
        let returnTest2 = false

        const routes = [
            {
                method: 'get',
                url: 'users',
                fn: () => {
                    returnTest1 = true
                }
            },
            {
                method: 'get',
                url: 'books',
                fn: () => {
                    returnTest2 = true
                }
            }
        ]

        const mockExpressInstance = {
            routes: [],
            get: (url, fn) => {
                mockExpressInstance.routes.push({url, fn})
            }
        }

        it('should add all routes to express instance', () => {
            setAllRoutes(mockExpressInstance, routes)

            assert.notDeepEqual(mockExpressInstance.routes, [])
            mockExpressInstance.routes.forEach((route) => route.fn())

            assert.equal(mockExpressInstance.routes[0].url, routes[0].url)
            assert.equal(mockExpressInstance.routes[1].url, routes[1].url)
            assert.ok(returnTest1)
            assert.ok(returnTest2)
        })

    })

})

import assert from 'assert'

import { genericErrorFunction } from './general'

describe('General Routes', () => {

    describe('genericErrorFunction', () => {

        const shouldReturn = {
            msg: "Error: Last error layer. We will work on that.",
            code: "500"
        }

        let returnTest = {
            msg: null,
            code: null
        }

        const res = {
            status: (code) => ({
                send: (msg) => {
                    returnTest = { code, msg }
                }
            })
        }

        it('should add route to express instance', () => {
            genericErrorFunction({}, res)

            assert.deepStrictEqual(returnTest, shouldReturn)
        })

    })

})

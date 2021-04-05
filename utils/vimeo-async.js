import Util from 'util'
import { Vimeo } from 'vimeo'

import config from "../config"

export const vimeoRequest = async (options) => {
    const client = new Vimeo(config.VIMEO_CLIENTID, config.VIMEO_CLIENTSECRET, config.VIMEO_ACCESSTOKEN)
    const request = Util.promisify(client.request.bind(client))
    return await request(options)
}

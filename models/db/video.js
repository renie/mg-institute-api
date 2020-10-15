import faker from "faker/locale/pt_BR"
import {VIDEO} from "../video"

const data = [...Array(100)].map(() => ({
    name: faker.name.title(),
    url: faker.internet.url()
}))

export const video = {
    entity: VIDEO,
    data
}

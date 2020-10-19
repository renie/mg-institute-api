import faker from "faker/locale/en"
import {VIDEO} from "../video"

const data = [...Array(100)].map(() => ({
    title: faker.name.title(),
    url: faker.internet.userName()
}))

export const video = {
    entity: VIDEO,
    data
}

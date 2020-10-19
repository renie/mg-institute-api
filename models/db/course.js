import faker from "faker/locale/pt_BR"
import {COURSE} from "../course"
import {video as videoData} from "./video"

const data = [...Array(10)].map((_, index) => ({
    title: faker.name.title(),
    videos: {
        entity: videoData.entity,
        data: videoData.data.slice(index * 10, (index * 10) + 10)
    }
}))

export const course = {
    entity: COURSE,
    data
}

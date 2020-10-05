import faker from 'faker/locale/pt_BR'
import { USER } from '../user'

const user = {
    entity: USER,
    data: [...Array(100)].map(() => ({
        name: faker.name.findName(),
        age: faker.random.number({'min': 18, 'max': 130 })
    }))
}

export const seeds = [user]

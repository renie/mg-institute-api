import faker from 'faker/locale/pt_BR'


const user = [...Array(100)].map(() => ({
    name: faker.name.findName(),
    age: faker.random.number({'min': 18, 'max': 130 })
}))

export const seeds = { user }

import faker from 'faker/locale/pt_BR'
import bcrypt from 'bcryptjs'
import { USER } from '../user'
import config from "../../config";

const data = [...Array(100)].map(() => ({
    name: faker.name.findName(),
    age: faker.random.number({'min': 18, 'max': 130 }),
    email: faker.internet.email(),
    password: faker.internet.password()
}))

data.push({
    name: faker.name.findName(),
    age: faker.random.number({'min': 18, 'max': 130 }),
    email: 'test@test.com',
    password: bcrypt.hashSync('123456', bcrypt.genSaltSync(Number(config.SALTROUNDS)))
})

const user = {
    entity: USER,
    data
}

export const seeds = [user]

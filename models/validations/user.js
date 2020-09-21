import { isValidString } from '../../utils/fn'


export const isValidName = (name) => isValidString(name)

export const isValid = (user) => isValidName(user.name)

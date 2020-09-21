export const isNull = obj => 
    obj === null

export const isUndefined = obj => 
    obj === undefined

export const isString = obj => (
    !isNull(obj) &&
    !isUndefined(obj) &&
    typeof obj === 'string'
)

export const hasLength = (obj, length = 0) => 
    obj.length > length

export const isValidString = string => (
    isString(string) &&
    hasLength(string)
)

import joi from 'react-native-joi'
import * as schemas from 'schemas'

const createModel = (creationObject, creationSchema) => {
  if (typeof creationObject === 'undefined') {
    const emptyObject = {}
    Object.keys(creationSchema).forEach(k => emptyObject[k] = null)
    return emptyObject
  }
  const validation = joi.validate(creationObject, creationSchema)
  if (validation.error) {
    throw new Error(validation.error)
  } else {
    return creationObject
  }
}

const validateModel = (creationObject, creationSchema) => {
  const validation = joi.validate(creationObject, creationSchema)
  return validation.error === null
}

Object.keys(schemas).forEach((schema) => {
  if (!schema.includes('default')) {
    const lowercaseName = schema.replace('Schema', '')
    const createName = `create${lowercaseName[0].toUpperCase()}${lowercaseName.slice(1)}`
    const validateName = `validate${lowercaseName[0].toUpperCase()}${lowercaseName.slice(1)}`
    module.exports[createName] = creationObject => createModel(creationObject, schemas[schema])
    module.exports[validateName] = creationObject => validateModel(creationObject, schemas[schema])
  }
})

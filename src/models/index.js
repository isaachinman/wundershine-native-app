import joi from 'react-native-joi'
import * as schemas from 'schemas'

const validate = (creationObject, creationSchema) => {
  const validation = joi.validate(creationObject, creationSchema)
  if (validation.error) {
    console.error(validation.error) // eslint-disable-line no-console
    throw new Error(validation.error)
  } else {
    return creationObject
  }
}

Object.keys(schemas).forEach((schema) => {
  if (!schema.includes('default')) {
    const lowercaseName = schema.replace('Schema', '')
    const name = `create${lowercaseName[0].toUpperCase()}${lowercaseName.slice(1)}`
    module.exports[name] = creationObject => validate(creationObject, schemas[schema])
  }
})

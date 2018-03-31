import * as schemas from './*.js'

Object.keys(schemas).forEach((schema) => {
  if (!schema.includes('index')) {
    module.exports[`${schema}Schema`] = schemas[schema]
  }
})

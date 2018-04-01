/*

  These schemas are used for all data objects

  Each schema must export (default) an object of joi
  validation types.

  For each schema, a create{{schema_name}} and
  validate{{schema_name}} function are automatically
  generated and importable via 'models'

*/

import * as schemas from './*.js'

Object.keys(schemas).forEach((schema) => {
  if (!schema.includes('index')) {
    module.exports[`${schema}Schema`] = schemas[schema]
  }
})

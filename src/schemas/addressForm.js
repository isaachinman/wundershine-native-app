import joi from 'react-native-joi'

export default {
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  city: joi.string().required(),
  country: joi.string().required(),
  line1: joi.string().required(),
  postalCode: joi.string().required(),

  addressName: joi.string().allow(null).optional(),
  line2: joi.string().allow(null).optional(),
  state: joi.string().allow(null).optional(),
  phone: joi.string().allow(null).optional(),
  _id: joi.string().optional(),
}

import joi from 'react-native-joi'

export default {
  createdAt: joi.string().required(),
  email: joi.string().email().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  shopifyCustomerID: joi.string(),
  addresses: joi.array(),
  _id: joi.string().required(),
}

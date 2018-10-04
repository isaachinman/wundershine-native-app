import joi from 'react-native-joi'

export default {
  createdAt: joi.string().required(),
  email: joi.string().email().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  shopifyCustomerID: joi.string(),
  stripeCustomerID: joi.string(),
  addresses: joi.array(),
  paymentMethods: {
    creditCards: joi.array(),
  },
  instagram: {
    _id: joi.string().required(),
    accessToken: joi.string().allow(null),
    user: {
      id: joi.string(),
      username: joi.string(),
      profilePicture: joi.string(),
      fullName: joi.string(),
    },
  },
  _id: joi.string().required(),
}

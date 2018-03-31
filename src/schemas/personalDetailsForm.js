import joi from 'react-native-joi'

export default {
  email: joi.string().email().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
}

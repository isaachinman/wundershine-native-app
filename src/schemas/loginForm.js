import joi from 'react-native-joi'

export default {
  email: joi.string().email().required(),
  password: joi.string().required(),
}

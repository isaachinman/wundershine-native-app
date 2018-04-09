import joi from 'react-native-joi'

export default {
  bytes: joi.number().required(),
  width: joi.number().required(),
  height: joi.number().required(),
  name: joi.string().required(),
  uri: joi.string().required(),
  type: joi.string().required(),
}

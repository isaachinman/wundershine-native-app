import joi from 'react-native-joi'

export default {
  bytes: joi.number().required(),
  width: joi.number().required(),
  height: joi.number().required(),
  name: joi.string().required(),
  uri: joi.string().required(),
  type: joi.string().required(),
  transformation: {
    topBoundary: joi.number().required(),
    rightBoundary: joi.number().required(),
    bottomBoundary: joi.number().required(),
    leftBoundary: joi.number().required(),
    rotation: joi.number().valid(0, 90, 180, 270).required(),
  },
}

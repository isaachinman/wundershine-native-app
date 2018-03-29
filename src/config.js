import { NativeModules } from 'react-native'
import config from 'react-native-config'
import env from './config.env' // Generated module

// Combine native config and generated JS config
export default {
  ...config,
  ...env,
  ...NativeModules.RNUeno,
  __native: config,
  __js: env,

  imageSettings: {
    square: {
      MAX_IMAGE_SIZE_MB: 55,
      MIN_IMAGE_WIDTH: 1500,
      MIN_IMAGE_HEIGHT: 1500,
    },
  },

}

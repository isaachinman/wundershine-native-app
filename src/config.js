import { NativeModules } from 'react-native'
import config from 'react-native-config'
import wundershineSettings from 'wundershine-data/settings.json'

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
      MAX_IMAGE_SIZE_MB: wundershineSettings.maxImageSizeMb,
      MIN_IMAGE_WIDTH: wundershineSettings.minImageWidth,
      MIN_IMAGE_HEIGHT: wundershineSettings.minImageHeight,
    },
  },

}

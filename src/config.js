import { NativeModules } from 'react-native'
import config from 'react-native-config'

import env from './config.env' // Generated module

// Combine native config and generated JS config
const appConfig = {
  ...config,
  ...env,
  ...NativeModules.RNUeno,
  __native: config,
  __js: env,
}

// Dev environment settings
if (process.env.NODE_ENV === 'development') {
  appConfig.API_ROOT = 'http://localhost:8080'
}

export default appConfig

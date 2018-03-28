import { YellowBox } from 'react-native'

// These will still be logged out to Developer Tools
YellowBox.ignoreWarnings([
  'RCTBatchedBridge',
  'Module RNFetchBlob requires',
  'RCTBridge required dispatch_sync',
  'Required dispatch_sync',
  'Module RCTImageLoader',
  'Module RNUeno',
  'Remote debugger',
])

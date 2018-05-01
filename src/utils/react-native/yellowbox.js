import { YellowBox } from 'react-native'

// These will still be logged out to Developer Tools
YellowBox.ignoreWarnings([
  'RCTBatchedBridge',
  'RCTBridge required dispatch_sync',
  'Required dispatch_sync',
  'Module RCTImageLoader',
  'Module RNUeno',
  'Remote debugger',
  'Class RCTCxxModule was not exported',
])

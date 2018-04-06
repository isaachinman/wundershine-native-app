import { AppRegistry, UIManager } from 'react-native'

import App from './src'
import Share from './src/components/ShareReceiver/ShareReceiver'

// Enable layout animations
if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

AppRegistry.registerComponent('Wundershine', () => App)
AppRegistry.registerComponent('ShareReceiver', () => Share)

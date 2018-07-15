import App from 'App'
import { Drawer } from 'components'
import { Navigation } from 'react-native-navigation'

import * as publicScreens from './public/*/*.js'
import * as privateScreens from './private/*/*.js'

// Assemble PublicScreens
export const PublicScreens = new Map()
Object.keys(publicScreens).forEach((screen) => {
  const screenName = screen.split('$')[1]
  if (!screenName.includes('Styles')) {
    PublicScreens.set(screenName, () => publicScreens[screen])
    module.exports[screenName] = publicScreens[screen]
  }
})

// Assemble PublicScreens
export const PrivateScreens = new Map()
Object.keys(privateScreens).forEach((screen) => {
  const screenName = screen.split('$')[1]
  if (!screenName.includes('Styles')) {
    PrivateScreens.set(screenName, () => privateScreens[screen])
    module.exports[screenName] = privateScreens[screen]
  }
})

// Combine all screens for registration
export const Screens = new Map([...PublicScreens, ...PrivateScreens])

// Register App and Drawer
Screens.set('Drawer', () => Drawer)
Screens.set('App', () => App)

export const startApp = (unvalidatedTokenPresent) => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'App',
    },
    passProps: {
      unvalidatedTokenPresent,
    },
    appStyle: {
      navBarHidden: true,
      navBarButtonColor: '#3C9CAA',
      keepStyleAcrossPush: false,
    },
    drawer: {
      disableOpenGesture: true,
      left: {
        screen: 'Drawer',
      },
      style: {
        drawerShadow: false,
        contentOverlayColor: 'rgba(0,0,0,0.25)',
      },
    },
    animationType: 'fade',
  })
}

import App from 'App'
import { Drawer } from 'components'
import { Navigation } from 'react-native-navigation'
import * as screens from './*/*.js'

// Assemble and export screens for registration
export const Screens = new Map()
Object.keys(screens).forEach((screen) => {
  const screenName = screen.split('$')[1]
  if (!screenName.includes('Styles')) {
    Screens.set(screenName, () => screens[screen])
    module.exports[screenName] = screens[screen]
  }
})

// Register App and Drawer
Screens.set('App', () => App)
Screens.set('Drawer', () => Drawer)

export const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'App',
    },
    passProps: {
      backButtonHidden: true,
    },
    drawer: {
      left: {
        screen: 'Drawer',
      },
      style: {
        drawerShadow: false,
        contentOverlayColor: 'rgba(0,0,0,0.25)',
      },
    },
  })
}

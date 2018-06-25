// import { AppRegistry } from 'react-native'
import { Navigation } from 'react-native-navigation'

import config from 'config'
import { Screens, startApp } from 'screens'
import stores, { getProvider } from 'stores'
import stripe from 'tipsi-stripe'

import 'utils/react-native/yellowbox'

try {
  stripe.setOptions({ publishableKey: config.STRIPE_PUBLISHABLE_KEY })
} catch (e) {
  // Handle error
}


(async () => {

  // Get provider
  const Provider = await getProvider(stores)

  // Register screens
  Array.from(Screens.entries()).forEach(([screenConst, screenModule]) =>
    Navigation.registerComponent(
      screenConst,
      screenModule,
      stores,
      Provider,
    ))

  stores
    .generalSetup()
    .then(startApp)

})()

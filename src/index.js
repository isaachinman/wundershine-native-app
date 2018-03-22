import { Navigation } from 'react-native-navigation'

import { Screens, startApp } from 'screens'
import stores, { getProvider } from 'stores'

import 'utils/react-native/yellowbox'

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

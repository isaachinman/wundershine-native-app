import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { Platform } from 'react-native'

import codePush from 'react-native-code-push'
import config from 'config'
import { configure } from 'mobx'
// import { create, persist } from 'mobx-persist'
import pMinDelay from 'p-min-delay'
import { Provider } from 'mobx-react'
import { Sentry } from 'react-native-sentry'
import { Toast } from 'components'
import xhr from 'utils/xhr'

// Stores
import AuthStore from './AuthStore'
import CartStore from './CartStore'
import InitialisationStore from './InitialisationStore'
import NetworkingStore from './NetworkingStore'
import QueueStore from './QueueStore'
import RoutingStore from './RoutingStore'
import UserStore from './UserStore'
import UIStore from './UIStore'

// Enable MobX strict mode
configure({ enforceActions: true })

// const hydrate = create({
//   storage: AsyncStorage,
//   jsonify: true,
// })

class Stores {

  // @persist('object', AuthStore)

  auth = AuthStore
  cart = CartStore
  initialisation = InitialisationStore
  networking = NetworkingStore
  queue = QueueStore
  routing = RoutingStore
  user = UserStore
  ui = UIStore

  async generalSetup() {
    // Hydrate store
    // await hydrate('store', this)
    return this
  }

  async loggedInSetup() {
    this.initialisation.setStatus(false)
    await pMinDelay(this.user.setup(), 1500)
    this.initialisation.setStatus(true)
  }

}

const stores = new Stores()
export default stores
export const loggedInSetup = stores.loggedInSetup.bind(stores) // eslint-disable-line

/**
 * StoreProvider
 * This HOC wraps all React instances (screens).
 * Add anything here that you need present across
 * the entire app (eg Toast)
 * @returns {Component}
 */
class StoreProvider extends PureComponent {

  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.node,
  };

  static defaultProps = {
    store: {},
    children: undefined,
  };

  render() {
    const { store, children } = this.props
    return (
      <Provider {...store}>
        <React.Fragment>
          <Toast />
          {children}
        </React.Fragment>
      </Provider>
    )
  }
}

/**
 * Get Provider method
 * Setup all services for dev or production.
 * @returns {Component}
 */
export const getProvider = async () => {

  if (__DEV__) {
    console.log('Provider initialized in developer mode') // eslint-disable-line no-console
    xhr.enabled()
    // No setup needed for developer environment
    return StoreProvider
  }

  if (!__DEV__ && config.SENTRY_DSN) {
    // Initialize Sentry
    if (config.SENTRY_DSN && config.SENTRY_DSN !== '') {
      Sentry.config(config.SENTRY_DSN).install()
    }

    // Set Sentry CodePush metadata
    codePush.getUpdateMetadata()
      .then((update) => {
        if (update) {
          Sentry.setVersion(`${update.appVersion}-codepush:${update.label}`)
        }
      })
  }

  // Setup codepush config
  const codePushConfig = {}

  if (Platform.OS === 'ios' && config.isTestFlight) {
    // We detected TestFlight installation
    // So we can use Staging deployment from Code Push
    codePushConfig.deploymentKey = config.IOS_CODEPUSH_DEPLOYMENT_KEY_STAGING
    codePushConfig.updateDialog = true
  }

  return codePush(codePushConfig)(StoreProvider)
}

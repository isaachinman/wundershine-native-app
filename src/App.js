/*

  This is the entry point for react-native-navigation

  This component does not actually render anything, but merely sets up some global
  configs and resets to one of two potential navigation stacks:

  1. Logged-in stack
  2. Logged-out stack

*/

import React from 'react'
import PropTypes from 'prop-types'

import { Linking, Platform } from 'react-native'
import SplashScreen from 'react-native-splash-screen'


import { inject, observer } from 'mobx-react'
import { NavActions } from 'utils/nav'

@inject('auth', 'networking', 'routing')
@observer
export default class App extends React.Component {

  static navigatorStyle = {
    statusBarColor: '#000000',
    navBarHidden: true,
  }

  constructor(props) {
    super(props)
    NavActions.setNavigator(props.navigator)
  }

  async componentWillMount() {

    // Capture url changes
    const { setUrl } = this.props.routing
    setUrl(await Linking.getInitialURL())
    Linking.addEventListener('url', url => setUrl(url.url))

    // Direct to initial stack
    if (this.props.unvalidatedTokenPresent) {
      NavActions.resetTo({ screen: 'ImageQueue', animated: false })
      this.props.auth.getLoginStatus()
    } else {
      NavActions.setDrawerEnabled({ side: 'left', enabled: false })
      NavActions.resetTo({ screen: 'Onboarding', animated: true })
    }

  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      setTimeout(() => SplashScreen.hide(), 200)
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url')
  }

  render = () => null
}

App.wrappedComponent.propTypes = {
  auth: PropTypes.shape({
    getLoginStatus: PropTypes.func,
    loggedIn: PropTypes.bool,
    loginStatusLoading: PropTypes.bool,
  }).isRequired,
  navigator: PropTypes.shape().isRequired,
  routing: PropTypes.shape({
    setUrl: PropTypes.func,
  }).isRequired,
  unvalidatedTokenPresent: PropTypes.bool.isRequired,
}

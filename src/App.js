import React from 'react'
import PropTypes from 'prop-types'
import { Linking } from 'react-native'

import { Splash } from 'screens'
import { inject, observer } from 'mobx-react'

import { NavActions } from 'utils/nav'

@inject('auth', 'networking', 'routing')
@observer
export default class App extends React.Component {

  static navigatorStyle = {
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

    // Get login status (will cause rerender)
    this.props.auth.getLoginStatus()

    // NetInfo.isConnected.addEventListener('connectionChange',
    //   this.props.networking.setHasNetworkConnection)

  }

  componentWillUnmount() {
    Linking.removeEventListener('url')
  }

  render() {

    const { auth } = this.props

    if (auth.loginStatusLoading) {
      return <Splash />
    }

    if (auth.loggedIn) {
      NavActions.resetTo({ screen: 'PhotoQueue' })
    } else {
      NavActions.setDrawerEnabled({ side: 'left', enabled: false })
      NavActions.resetTo({ screen: 'Onboarding', animated: false })
    }

    return null

  }
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
}

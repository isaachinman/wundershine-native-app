import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { screenUtils } from 'utils/nav'

import { View, WebView } from 'react-native'

import styles from './Checkout.styles'

@inject('cart')
@screenUtils
@observer
export default class Checkout extends React.Component {

  static screenTitle = 'Checkout'

  render() {

    const { cart } = this.props

    return (
      <View style={styles.container}>
        <WebView
          source={{ uri: cart.checkoutURL }}
        />
      </View>
    )
  }
}

Checkout.wrappedComponent.propTypes = {
  cart: PropTypes.shape().isRequired,
}

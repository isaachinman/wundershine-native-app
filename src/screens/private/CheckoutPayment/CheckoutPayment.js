import React from 'react'
// import PropTypes from 'prop-types'

import { Button } from 'components'
import { inject, observer } from 'mobx-react'
import { screenUtils, NavActions } from 'utils/nav'

import { Text, View } from 'react-native'

import styles from './CheckoutPayment.styles'

@inject('cart', 'user')
@screenUtils
@observer
export default class CheckoutPayment extends React.Component {

  static screenTitle = 'Payment method'

  render() {

    return (
      <View style={styles.container}>
        <Text>Payment screen</Text>
        <Button
          onPress={() => NavActions.push({ screen: 'CheckoutConfirmation' })}
          text='Next'
          primary
          full
        />
      </View>
    )
  }
}

CheckoutPayment.wrappedComponent.propTypes = {}

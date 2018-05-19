import React from 'react'
// import PropTypes from 'prop-types'

import { Button } from 'components'
import { inject, observer } from 'mobx-react'
import { screenUtils, NavActions } from 'utils/nav'

import { Text, View } from 'react-native'

import styles from './CheckoutDelivery.styles'

@inject('cart', 'user')
@screenUtils
@observer
export default class CheckoutDelivery extends React.Component {

  static screenTitle = 'Delivery address'

  render() {

    return (
      <View style={styles.container}>
        <Text>Delivery screen</Text>
        <Button
          onPress={() => NavActions.push({ screen: 'CheckoutPayment' })}
          text='Next'
          primary
          full
        />
      </View>
    )
  }
}

CheckoutDelivery.wrappedComponent.propTypes = {}

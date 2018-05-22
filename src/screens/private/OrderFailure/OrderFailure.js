import React from 'react'
import PropTypes from 'prop-types'

import { inject, propTypes as mobxPropTypes, observer } from 'mobx-react'
import { screenUtils, NavActions } from 'utils/nav'

import { Button, Icon } from 'components'
import { Text, View } from 'react-native'

import styles from './OrderFailure.styles'

@inject('orders')
@screenUtils
@observer
export default class OrderFailure extends React.Component {

  static screenTitle = 'Order failed'

  handleClose = () => NavActions.dismissAllModals()

  render() {

    const order = this.props.orders.data.get(this.props.orderID)
    const { stripeError } = order

    return (
      <View style={styles.container}>
        <Icon
          name='ios-alert'
          style={styles.iconAlert}
        />
        <Text style={styles.title}>
          Uh-oh
        </Text>
        <Text style={styles.subtitle}>
          {stripeError.message} You have not been charged.
          Please try again, ensuring your payment method is valid.
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.handleClose}
            text='OK'
            danger
            full
          />
        </View>
      </View>
    )
  }
}

/* eslint-disable react/no-typos */
OrderFailure.wrappedComponent.propTypes = {
  orderID: PropTypes.string.isRequired,
  orders: PropTypes.shape({
    data: mobxPropTypes.observableMap,
  }).isRequired,
}

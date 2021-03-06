import React from 'react'
import PropTypes from 'prop-types'

import { inject, propTypes as mobxPropTypes, observer } from 'mobx-react'
import { screenUtils, NavActions } from 'utils/nav'

import { ActivityIndicator, Text, View } from 'react-native'

import { blackTertiary } from 'styles/colours'
import styles from './OrderProcessing.styles'

@inject('cart', 'orders', 'routing')
@screenUtils
@observer
export default class OrderProcessing extends React.Component {

  static screenTitle = 'Order status'

  componentWillMount() {
    this.pendingOrderID = this.props.pendingOrderID || this.props.routing.params.pendingOrderID
  }

  componentDidMount() {
    // Start polling process
    this.props.orders.pollOrderUntilNotPending(this.pendingOrderID)
  }

  async componentDidUpdate() {
    const { orders, cart } = this.props
    const order = orders.data.get(this.pendingOrderID)
    if (order.status.code !== 'pending' && !cart.loading && !orders.loading) {

      // Refetch cart and orders
      await cart.getCart()
      await orders.getOrders()

      NavActions.showModal({
        screen: order.status.code === 'paid' ? 'OrderSuccess' : 'OrderFailure',
        passProps: { orderID: order._id },
      })
    }
  }

  render() {

    const processingOrder = this.props.orders.data.get(this.pendingOrderID)

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Order {processingOrder.status.code}...
        </Text>
        <Text style={styles.subtitle}>
          Please wait as your order is processed. This can take a few minutes.
        </Text>
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size='large' color={blackTertiary} />
        </View>
      </View>
    )
  }
}

OrderProcessing.wrappedComponent.defaultProps = {
  pendingOrderID: null,
}

/* eslint-disable react/no-typos */
OrderProcessing.wrappedComponent.propTypes = {
  pendingOrderID: PropTypes.string,
  orders: PropTypes.shape({
    data: mobxPropTypes.observableMap,
    pollOrderUntilNotPending: PropTypes.func.isRequired,
  }).isRequired,
  routing: PropTypes.shape({
    params: PropTypes.shape({
      pendingOrderID: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

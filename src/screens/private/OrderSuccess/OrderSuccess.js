import React from 'react'

import { inject, observer } from 'mobx-react'
import { screenUtils, NavActions } from 'utils/nav'

import { Button, Icon } from 'components'
import { Text, View } from 'react-native'

import styles from './OrderSuccess.styles'

@inject('orders')
@screenUtils
@observer
export default class OrderSuccess extends React.Component {

  static screenTitle = 'Order complete'

  handleClose = () => {
    NavActions.resetTo({ screen: 'ImageQueue' })
    NavActions.dismissAllModals()
  }

  render() {

    return (
      <View style={styles.container}>
        <Icon
          name='ios-checkmark-circle'
          style={styles.iconCheckmark}
        />
        <Text style={styles.title}>
          Thank you
        </Text>
        <Text style={styles.subtitle}>
          Your order is complete! You will receive confirmation via email within a few minutes.
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.handleClose}
            text='OK'
            primary
            full
          />
        </View>
      </View>
    )
  }
}

/* eslint-disable react/no-typos */
// OrderSuccess.wrappedComponent.propTypes = {
//   orderID: PropTypes.string.isRequired,
//   orders: PropTypes.shape({
//     data: mobxPropTypes.observableMap,
//   }).isRequired,
// }

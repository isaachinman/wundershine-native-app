import React from 'react'
// import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { screenUtils } from 'utils/nav'

import { Text, View } from 'react-native'

import styles from './CheckoutConfirmation.styles'

@inject('cart', 'user')
@screenUtils
@observer
export default class CheckoutConfirmation extends React.Component {

  static screenTitle = 'Confirm order'

  render() {

    return (
      <View style={styles.container}>
        <Text>Confirmation screen</Text>
      </View>
    )
  }
}

CheckoutConfirmation.wrappedComponent.propTypes = {}

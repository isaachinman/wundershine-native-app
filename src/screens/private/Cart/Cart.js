import React from 'react'
// import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { screenUtils } from 'utils/nav'

import { ActionBar } from 'react-native-ui-lib'
import { Text, View } from 'react-native'

import styles from './Cart.styles'

@inject('cart')
@screenUtils
@observer
export default class Cart extends React.Component {

  static screenTitle = 'Cart'

  render() {

    // const { cart } = this.props

    return (
      <View style={styles.container}>
        <View
          style={styles.content}
        >
          <Text>CART PAGE</Text>
        </View>
        <ActionBar
          actions={[
            {
              label: 'Add A Pack',
              onPress: () => {},
            },
            {
              label: 'Checkout',
              onPress: () => {},
            },
          ]}
        />
      </View>
    )
  }
}

// Cart.wrappedComponent.propTypes = {
//   cart: PropTypes.shape({

//   }).isRequired,
// }

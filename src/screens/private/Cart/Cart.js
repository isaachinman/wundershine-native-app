import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { screenUtils, NavActions } from 'utils/nav'

import { Col, Row } from 'react-native-easy-grid'
import { Icon, Loader, PrintStack } from 'components'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import styles from './Cart.styles'

@inject('cart', 'coreData')
@screenUtils
@observer
export default class Cart extends React.Component {

  static screenTitle = 'Cart'

  static navigatorButtons = {
    leftButtons: [
      {
        id: 'back',
        title: 'Back',
      },
    ],
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress' && event.id === 'back') {
      NavActions.popToRoot()
    }
  }

  render() {

    const { cart, coreData } = this.props

    return (
      <View style={styles.container}>
        <Loader active={cart.loading} />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.content}
        >
          <View style={styles.itemContainer}>
            {cart.data.items.map((item) => {
              const product = coreData.products[item.sku]
              return (
                <Row key={item.printpack._id}>
                  <Col style={styles.col1}>
                    <PrintStack
                      images={item.printpack.images}
                    />
                  </Col>
                  <Col style={styles.col2}>
                    <Text style={styles.productName}>
                      {product.name}
                    </Text>
                    <Text style={styles.forFrame}>
                      For Reframe
                    </Text>
                    <Text style={styles.productPrice}>
                      €{(parseFloat(product.shopifyData.price) * item.quantity).toFixed(2)}
                    </Text>
                  </Col>
                  <Col style={styles.col3}>

                    <View style={styles.stepperContainer}>
                      <TouchableOpacity
                        onPress={() => cart.changeItemQuantity(item._id, item.quantity - 1)}
                      >
                        <Icon style={styles.iconStep} name='ios-remove-circle-outline' />
                      </TouchableOpacity>
                      <Text style={styles.stepLabel}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() => cart.changeItemQuantity(item._id, item.quantity + 1)}
                      >
                        <Icon style={styles.iconStep} name='ios-add-circle-outline' />
                      </TouchableOpacity>
                    </View>

                    <Icon style={styles.iconMore} name='md-more' />
                  </Col>
                </Row>
              )
            })}
          </View>

          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextNormal}>
                SUBTOTAL
              </Text>
            </Col>
          </Row>
          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextNormal}>
                SHIPPING
              </Text>
            </Col>
          </Row>
          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextBold}>
                TOTAL
              </Text>
            </Col>
          </Row>

        </ScrollView>
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionBarAddPack}>
            <Text style={styles.actionBarAddPackText}>ADD A PACK</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBarCheckout}>
            <Text style={styles.actionBarCheckoutText}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

Cart.wrappedComponent.propTypes = {
  coreData: PropTypes.shape({
    products: PropTypes.shape(),
  }).isRequired,
  cart: PropTypes.shape().isRequired,
  navigator: PropTypes.shape({
    setOnNavigatorEvent: PropTypes.func.isRequired,
  }).isRequired,
}

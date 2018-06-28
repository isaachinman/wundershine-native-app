import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { screenUtils, NavActions } from 'utils/nav'

import { AddDiscountModal } from 'components/Modals'
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Col, Row } from 'react-native-easy-grid'
import { Icon, Loader, PrintStack } from 'components'
import { ListItem } from 'react-native-ui-lib'
import { Menu, MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu'
import Modal from 'react-native-modal'

import { greyAccent } from 'styles/colours'
import styles from './Cart.styles'

@inject('cart', 'coreData', 'ui')
@screenUtils
@observer
export default class Cart extends React.Component {

  static screenTitle = 'Cart'

  state = {
    quantityPickerOpen: false,
    packForQuantityAdjustment: {},
  }

  componentWillMount() {
    if (this.props.inModal) {
      this.props.navigator.setButtons({ leftButtons: [] })
    }
  }

  toggleQuantityPicker = (bool = false, pack = {}) => {
    this.setState({
      quantityPickerOpen: bool,
      packForQuantityAdjustment: pack,
    })
  }

  returnToImageQueue = () => {
    if (this.props.inModal) {
      NavActions.popToRoot()
      NavActions.dismissModal()
    } else {
      NavActions.pop()
    }
  }

  dissolvePrintpacks = async (printpacks) => {
    const { cart } = this.props
    const totalPrintpacks = cart.data.items.filter(i => i.type === 'printpack').length
    if (totalPrintpacks - printpacks.length <= 0) {
      this.returnToImageQueue()
    }
    await cart.dissolvePrintpacks(printpacks)
  }

  removeDiscount = async () => {
    Alert.alert(
      'Remove discount code',
      'Are you sure you want to remove the current discount code?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove discount',
          onPress: async () => this.props.cart.removeDiscount(),
        },
      ],
      { cancelable: false },
    )
  }

  goToCheckout = () => {
    if (this.props.inModal) {
      NavActions.dismissModal()
    } else {
      NavActions.push({ screen: 'CheckoutDelivery' })
    }
  }

  render() {

    const { cart, coreData } = this.props
    const { quantityPickerOpen, packForQuantityAdjustment } = this.state

    return (
      <View style={styles.container}>

        <Loader active={cart.loading} />
        <AddDiscountModal />

        <Modal
          isVisible={quantityPickerOpen}
        >
          <ScrollView style={styles.quantityPickerContainer}>
            <View style={styles.quantityPickerHeader}>
              <Text style={styles.quantityPickerHeaderText}>Quantity</Text>
            </View>
            <View>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <ListItem
                  activeBackgroundColor={greyAccent}
                  height={50}
                  onPress={() => {
                    this.toggleQuantityPicker()
                    setTimeout(() => {
                      cart.changeItemQuantity(packForQuantityAdjustment._id, num)
                    }, 500)
                  }}
                  key={`quantity-selection-${num}`}
                >
                  <ListItem.Part middle column>
                    <Text style={styles.quantityPickerNumLabel}>{num}</Text>
                  </ListItem.Part>
                  <ListItem.Part right column>
                    <Text style={styles.quantityPickerNumLabel}>
                      {num === packForQuantityAdjustment.quantity ?
                        <Icon name='ios-checkmark' style={styles.iconPackQuantityCheckmark} />
                        :
                        null
                      }
                    </Text>
                  </ListItem.Part>
                </ListItem>
              ))}
            </View>
          </ScrollView>
        </Modal>

        <View
          style={styles.content}
        >
          <ScrollView contentContainerStyle={styles.itemContainer}>
            {cart.data.items.map((item) => {
              const product = coreData.products[item.sku]
              return (
                <Row key={item.printpack._id} style={styles.itemRow}>
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
                    <Menu>
                      <MenuTrigger>
                        <Icon style={styles.iconMore} name='md-more' />
                      </MenuTrigger>
                      <MenuOptions>
                        <MenuOption onSelect={() => this.toggleQuantityPicker(true, item)}>
                          <Text style={styles.editPackText}>Change quantity: {item.quantity}</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => this.dissolvePrintpacks([item.printpack._id])}>
                          <Text style={styles.editPackText}>Edit pack</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => {}}>
                          <Text style={styles.deletePackText}>Delete pack and images</Text>
                        </MenuOption>
                      </MenuOptions>
                    </Menu>
                  </Col>
                </Row>
              )
            })}
          </ScrollView>

          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextNormal}>
                SUBTOTAL
              </Text>
            </Col>
            <Col style={styles.alignRight}>
              <Text style={styles.pricingTextNormal}>
                €{cart.data.subtotalPrice.toFixed(2)}
              </Text>
            </Col>
          </Row>
          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextNormal}>
                SHIPPING
              </Text>
            </Col>
            <Col style={styles.alignRight}>
              <Text style={styles.pricingTextNormal}>
                €{cart.data.totalShippingPrice.toFixed(2)}
              </Text>
            </Col>
          </Row>
          <Row style={styles.pricingRow}>
            {cart.data.discount ?
              <React.Fragment>
                <Col style={{ flexDirection: 'row' }}>
                  <Text style={styles.pricingTextNormal}>
                    {cart.data.discount.code}
                  </Text>
                  <TouchableOpacity onPress={this.removeDiscount}>
                    <Icon
                      name='ios-close'
                      style={styles.iconClose}
                    />
                  </TouchableOpacity>
                </Col>
                <Col style={styles.alignRight}>
                  <Text style={styles.pricingTextNormal}>
                    - €{cart.data.totalDiscount.toFixed(2)}
                  </Text>
                </Col>
              </React.Fragment>
              :
              <Col style={styles.alignRight}>
                <TouchableOpacity onPress={() => this.props.ui.toggleModal('addDiscount', true)}>
                  <Text style={styles.addDiscountCode}>
                    Add a discount code
                  </Text>
                </TouchableOpacity>
              </Col>
            }
          </Row>
          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextBold}>
                TOTAL
              </Text>
            </Col>
            <Col style={styles.alignRight}>
              <Text style={styles.pricingTextBold}>
                €{cart.data.totalPrice.toFixed(2)}
              </Text>
            </Col>
          </Row>
          <View style={styles.actionBar}>
            <TouchableOpacity
              onPress={this.returnToImageQueue}
              style={styles.actionBarAddPack}
            >
              <Text style={styles.actionBarAddPackText}>ADD A PACK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.goToCheckout}
              style={styles.actionBarCheckout}
            >
              <Text style={styles.actionBarCheckoutText}>CHECKOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

Cart.defaultProps = {
  inModal: false,
}

Cart.wrappedComponent.propTypes = {
  coreData: PropTypes.shape({
    products: PropTypes.shape(),
  }).isRequired,
  cart: PropTypes.shape().isRequired,
  inModal: PropTypes.bool,
  navigator: PropTypes.shape({
    setButtons: PropTypes.func.isRequired,
    setOnNavigatorEvent: PropTypes.func.isRequired,
  }).isRequired,
  ui: PropTypes.shape({
    data: PropTypes.shape(),
    toggleModal: PropTypes.func.isRequired,
  }).isRequired,
}

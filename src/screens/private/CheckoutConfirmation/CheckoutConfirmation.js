import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { AddDiscountModal } from 'components/Modals'
import { Button, Loader } from 'components'
import { Col, Row } from 'react-native-easy-grid'
import { Container, Content } from 'native-base'

import { screenUtils, NavActions } from 'utils/nav'

import { Linking, Text, TouchableOpacity } from 'react-native'

import styles from './CheckoutConfirmation.styles'

@inject('cart', 'orders', 'ui', 'user')
@screenUtils
@observer
export default class CheckoutConfirmation extends React.Component {

  static screenTitle = 'Confirm order'

  launchPreviousStepAsModal = (screen) => {
    NavActions.showModal({ screen, passProps: { inModal: true } })
  }

  processOrder = async () => {
    const { cart, orders, user } = this.props
    const pendingOrder = await orders
      .createOrder(cart.data._id, user.data.addresses[0]._id, cart.paymentMethodChosen)
    if (pendingOrder.paymentType === 'cc' || pendingOrder.paymentType === 'none') {
      setTimeout(() => {
        NavActions.showModal({ screen: 'OrderProcessing', passProps: { pendingOrderID: pendingOrder._id } })
      }, 10)
    } else if (pendingOrder.paymentType === 'ideal') {
      Linking.openURL(pendingOrder.paymentMethodInfo.ideal.redirectURL)
    }
  }

  render() {

    const { cart, orders, user } = this.props

    const numberOfItemsInCart = cart.data.items.reduce((acc, i) => acc + i.quantity, 0)
    const shippingAddress = user.data.addresses[0]

    let paymentLabel = null
    if (cart.paymentMethodChosen.type === 'ideal') {
      paymentLabel = 'iDEAL'
    } else if (cart.paymentMethodChosen.type === 'cc') {
      const chosenCreditCard = user.data.paymentMethods.creditCards
        .find(c => c._id === cart.paymentMethodChosen.id)
      paymentLabel = `•••• •••• •••• ${chosenCreditCard.last4}`
    } else if (cart.data.totalPrice === 0) {
      paymentLabel = 'N/A'
    }

    return (
      <Container>
        <Loader active={orders.loading} />
        <AddDiscountModal />
        <Content contentContainerStyle={styles.content}>
          <Row style={styles.row}>
            <Col style={styles.titleCol}>
              <Text
                style={styles.sectionTitle}
              >
                Cart
              </Text>
            </Col>
            <Col style={styles.contentCol}>
              <Text
                style={styles.sectionBody}
              >
                {numberOfItemsInCart} {numberOfItemsInCart < 2 ? 'item' : 'items'}
                &nbsp;
                (€{cart.data.subtotalPrice.toFixed(2)})
              </Text>
            </Col>
            <TouchableOpacity
              onPress={() => this.launchPreviousStepAsModal('Cart')}
            >
              <Col style={styles.editCol}>
                <Text
                  style={styles.editText}
                >
                  Edit
                </Text>
              </Col>
            </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
            <Col style={styles.titleCol}>
              <Text
                style={styles.sectionTitle}
              >
                Discount
              </Text>
            </Col>
            <Col style={styles.contentCol}>
              <Text
                style={styles.sectionBody}
              >
                {cart.data.discount ?
                  <Text>{cart.data.discount.code} (-€{cart.data.totalDiscount.toFixed(2)})</Text>
                  :
                  <Text>-</Text>
                }
              </Text>
            </Col>
            <TouchableOpacity
              onPress={() => this.props.ui.toggleModal('addDiscount', true)}
            >
              <Col style={styles.editCol}>
                <Text
                  style={styles.editText}
                >
                  Edit
                </Text>
              </Col>
            </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
            <Col style={styles.titleCol}>
              <Text
                style={styles.sectionTitle}
              >
                Address
              </Text>
            </Col>
            <Col style={styles.contentCol}>
              <Text
                style={styles.sectionBody}
              >
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Text>
              <Text
                style={styles.sectionBody}
              >
                {shippingAddress.line1}
              </Text>
              <Text
                style={styles.sectionBody}
              >
                {shippingAddress.postalCode}, {shippingAddress.city}, {shippingAddress.country}
              </Text>
              <Text
                style={styles.sectionBody}
              >
                {shippingAddress.phone}
              </Text>
            </Col>
            <TouchableOpacity onPress={() => this.launchPreviousStepAsModal('CheckoutDelivery')}>
              <Col style={styles.editCol}>
                <Text
                  style={styles.editText}
                >
                  Edit
                </Text>
              </Col>
            </TouchableOpacity>
          </Row>
          <Row style={styles.row}>
            <Col style={styles.titleCol}>
              <Text
                style={styles.sectionTitle}
              >
                Payment
              </Text>
            </Col>
            <Col style={styles.contentCol}>
              <Text
                style={styles.sectionBody}
              >
                {paymentLabel}
              </Text>
            </Col>
            <TouchableOpacity onPress={() => this.launchPreviousStepAsModal('CheckoutPayment')}>
              <Col style={styles.editCol}>
                <Text
                  style={styles.editText}
                >
                  Edit
                </Text>
              </Col>
            </TouchableOpacity>
          </Row>
          <Row style={{ flex: 1 }}>
            <Row style={styles.endRow}>
              <Col style={styles.contentCol}>
                <Text
                  style={styles.sectionTitle}
                >
                  TOTAL
                </Text>
              </Col>
              <Col style={styles.editCol}>
                <Text
                  style={styles.sectionTitle}
                >
                  €{cart.data.totalPrice.toFixed(2)}
                </Text>
              </Col>
            </Row>
          </Row>
        </Content>
        <Button
          onPress={this.processOrder}
          icon='lock'
          text='Complete order'
          disabled={!cart.cartIsProcessable}
          primary
          full
        />
      </Container>
    )
  }
}

CheckoutConfirmation.wrappedComponent.propTypes = {
  cart: PropTypes.shape({
    setDefaultPaymentMethod: PropTypes.func.isRequired,
  }).isRequired,
  orders: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    addCreditCard: PropTypes.func.isRequired,
    deleteCreditCard: PropTypes.func.isRequired,
  }).isRequired,
  ui: PropTypes.shape({
    toggleModal: PropTypes.func.isRequired,
  }).isRequired,
}

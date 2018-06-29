import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Button, CreditCard, Icon, Loader } from 'components'
import { Col, Row } from 'react-native-easy-grid'
import { Container, Content } from 'native-base'

import idealImage from 'images/ideal.png'

import { screenUtils, NavActions } from 'utils/nav'

import stripe from 'tipsi-stripe'
import { Image, Text, TouchableOpacity } from 'react-native'

import styles from './CheckoutPayment.styles'

@inject('cart', 'user')
@screenUtils
@observer
export default class CheckoutPayment extends React.Component {

  static screenTitle = 'Payment method'

  componentWillMount() {
    this.props.cart.setDefaultPaymentMethod()
  }

  addNewCreditCard = async () => {
    try {
      const { cart, user } = this.props
      const token = await stripe.paymentRequestWithCardForm()
      await user.addCreditCard(token.tokenId)
      cart.setDefaultPaymentMethod()
    } catch (e) {
      // Handle error
    }
  }

  replaceCreditCard = async (ccID) => {
    try {
      const { cart, user } = this.props
      const token = await stripe.paymentRequestWithCardForm()
      cart.setPaymentMethod(null)
      await user.deleteCreditCard(ccID)
      await user.addCreditCard(token.tokenId)
      cart.setDefaultPaymentMethod()
    } catch (e) {
      // Handle error
    }
  }

  goToCheckoutConfirmation = () => {
    if (this.props.inModal) {
      NavActions.dismissModal()
    } else {
      NavActions.push({ screen: 'CheckoutConfirmation' })
    }
  }

  render() {

    const { cart, inModal, user } = this.props
    const { paymentMethodChosen } = cart
    const { paymentMethods } = user.data

    return (
      <Container>
        <Loader active={user.loading} />
        <Content contentContainerStyle={styles.content}>
          {paymentMethods.creditCards.length === 0 &&
            <TouchableOpacity
              onPress={this.addNewCreditCard}
            >
              <Row style={styles.row}>
                <Col style={styles.col}>
                  <Icon
                    name={paymentMethodChosen.type === 'cc' ? 'ios-radio-button-on' : 'ios-radio-button-off'}
                    style={paymentMethodChosen.type === 'cc' ? styles.iconRadioButtonOn : styles.iconRadioButtonOff}
                  />
                  <Text
                    style={styles.radioButtonLabel}
                  >
                    Credit Card
                  </Text>
                </Col>
              </Row>
            </TouchableOpacity>
          }
          {paymentMethods.creditCards.map(cc => (
            <TouchableOpacity
              key={cc._id}
              onPress={() => cart.setPaymentMethod('cc', cc._id)}
            >
              <Row style={styles.row}>
                <Col style={styles.col}>
                  <Icon
                    name={paymentMethodChosen.id === cc._id ? 'ios-radio-button-on' : 'ios-radio-button-off'}
                    style={paymentMethodChosen.id === cc._id ?
                      styles.iconRadioButtonOn : styles.iconRadioButtonOff}
                  />
                  <CreditCard
                    {...cc}
                    editAction={() => this.replaceCreditCard(cc._id)}
                    deleteAction={async () => {
                      await user.deleteCreditCard(cc._id)
                      cart.setPaymentMethod(null)
                    }}
                  />
                </Col>
              </Row>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => cart.setPaymentMethod('ideal')}
          >
            <Row style={styles.row}>
              <Col style={styles.col}>
                <Icon
                  name={paymentMethodChosen.type === 'ideal' ? 'ios-radio-button-on' : 'ios-radio-button-off'}
                  style={paymentMethodChosen.type === 'ideal' ? styles.iconRadioButtonOn : styles.iconRadioButtonOff}
                />
                <Image
                  source={idealImage}
                  style={styles.iconIdeal}
                />
              </Col>
            </Row>
          </TouchableOpacity>
        </Content>
        <Button
          onPress={this.goToCheckoutConfirmation}
          text={inModal ? 'Update' : 'Next'}
          disabled={!cart.paymentMethodIsValid}
          primary
          full
        />
      </Container>
    )
  }
}

CheckoutPayment.defaultProps = {
  inModal: false,
}

CheckoutPayment.wrappedComponent.propTypes = {
  cart: PropTypes.shape({
    paymentMethodIsValid: PropTypes.bool.isRequired,
    setDefaultPaymentMethod: PropTypes.func.isRequired,
  }).isRequired,
  inModal: PropTypes.bool,
  user: PropTypes.shape({
    addCreditCard: PropTypes.func.isRequired,
    deleteCreditCard: PropTypes.func.isRequired,
  }).isRequired,
}

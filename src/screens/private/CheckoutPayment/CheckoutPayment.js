import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Button, Icon } from 'components'
import { Col, Row } from 'react-native-easy-grid'
import { Container, Content } from 'native-base'

import idealImage from 'images/ideal.png'

import { screenUtils } from 'utils/nav'

import stripe from 'tipsi-stripe'
import { Image, Text, TouchableOpacity } from 'react-native'

import styles from './CheckoutPayment.styles'

@inject('cart', 'user')
@screenUtils
@observer
export default class CheckoutPayment extends React.Component {

  static screenTitle = 'Payment method'

  addNewCreditCart = async () => {
    const token = await stripe.paymentRequestWithCardForm()
    console.log(token) // eslint-disable-line
  }

  render() {

    const { cart } = this.props

    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <TouchableOpacity>
            <Row style={styles.row}>
              <Col style={styles.col}>
                <Icon
                  name='ios-radio-button-off'
                  style={styles.iconRadioButton}
                />
                <Text
                  style={styles.radioButtonLabel}
                >
                  Credit Card
                </Text>
              </Col>
            </Row>
          </TouchableOpacity>
          <TouchableOpacity>
            <Row style={styles.row}>
              <Col style={styles.col}>
                <Icon
                  name='ios-radio-button-off'
                  style={styles.iconRadioButton}
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
          onPress={this.handleSave}
          text='Next'
          disabled={cart.paymentMethodIsValid}
          primary
          full
        />
      </Container>
    )
  }
}

CheckoutPayment.wrappedComponent.propTypes = {
  cart: PropTypes.shape({
    paymentMethodIsValid: PropTypes.bool.isRequired,
  }).isRequired,
}

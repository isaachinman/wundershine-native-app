import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer, propTypes as mobxPropTypes } from 'mobx-react'
import { screenUtils } from 'utils/nav'

import { Button, Input } from 'components'
import { Text, View } from 'react-native'
import Modal from 'react-native-modal'

import styles from './AddDiscountModal.styles'

@inject('cart', 'ui')
@screenUtils
@observer
export default class AddDiscountModal extends React.Component {

  applyDiscount = async () => {
    const { cart } = this.props
    try {
      await cart.applyDiscount()
      cart.clearForm('discountCode')
      this.handleClose()
    } catch (e) {
      // Handle error
    }
  }

  handleClose = () => {
    const { cart, ui } = this.props
    if (!cart.loading) {
      ui.toggleModal('addDiscount', false)
    }
  }

  render() {

    const { cart, ui } = this.props

    const {
      discountCodeForm,
      discountCodeFormIsValid,
      updateForm,
    } = cart

    return (
      <Modal
        isVisible={ui.modals.addDiscount.open}
        onBackButtonPress={this.handleClose}
        onBackdropPress={this.handleClose}
        avoidKeyboard
        useNativeDriver
      >
        <View style={styles.modalContentContainer}>
          <View style={styles.container}>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>
                Discount code
              </Text>
              <View style={{ height: 50 }}>
                <Input
                  placeholder='Enter discount code'
                  onChangeText={t => updateForm('discountCode', 'discountCode', t)}
                  value={discountCodeForm.discountCode}
                />
              </View>
              {cart.discountCodeError ?
                <Text style={styles.errorText}>
                  {cart.discountCodeError}
                </Text>
                :
                <Text style={styles.description}>
                  All Reframe purchases come with a coupon for a free
                  5-Pack of prints, including worldwide shipping.
                </Text>
              }
            </View>
            <Button
              onPress={this.applyDiscount}
              text='Redeem'
              full
              primary
              loading={cart.loading}
              disabled={!discountCodeFormIsValid}
              style={styles.button}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

/* eslint-disable react/no-typos */
AddDiscountModal.wrappedComponent.propTypes = {
  cart: PropTypes.shape({
    data: PropTypes.shape(),
  }).isRequired,
  ui: PropTypes.shape({
    data: mobxPropTypes.observableMap,
  }).isRequired,
}

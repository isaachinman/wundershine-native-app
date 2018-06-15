import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer, propTypes as mobxPropTypes } from 'mobx-react'

import { KeyboardAvoidingView, View } from 'react-native'

import { Button, Dropdown, Input } from 'components'
import { Content } from 'native-base'
import { Col, Row } from 'react-native-easy-grid'
import getCountries from 'country-list'

import { screenUtils, NavActions } from 'utils/nav'

import styles from './CheckoutDelivery.styles'

const countries = getCountries()

@inject('coreData', 'user')
@screenUtils
@observer
export default class CheckoutDelivery extends React.Component {

  static screenTitle = 'Delivery address'

  handleSave = async () => {
    const { inModal, user } = this.props
    try {
      await user.updateAddresses({ toast: false })
      if (inModal) {
        NavActions.dismissModal()
      } else {
        NavActions.push({ screen: 'CheckoutPayment' })
      }
    } catch (error) {
      // Handle update error here
    }
  }

  render() {

    const { coreData, inModal, user } = this.props
    const { addressForm, addressFormIsValid, updateForm } = user

    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
        >
          <Content contentContainerStyle={styles.content}>
            <Row style={styles.row}>
              <Col style={styles.col}>
                <Dropdown
                  label='Country*'
                  data={coreData.settings.shippableCountries
                    .map(c => ({ value: c, label: countries.getName(c) }))}
                  value={addressForm.country}
                  onChangeText={t => updateForm('address', 'country', t)}
                />
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.col}>
                <Input
                  title='First name*'
                  onChangeText={t => updateForm('address', 'firstName', t)}
                  value={addressForm.firstName}
                />
              </Col>
              <Col style={styles.col}>
                <Input
                  title='Last name*'
                  onChangeText={t => updateForm('address', 'lastName', t)}
                  value={addressForm.lastName}
                />
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.col}>
                <Input
                  title='Street address line 1*'
                  onChangeText={t => updateForm('address', 'line1', t)}
                  value={addressForm.line1}
                />
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.col}>
                <Input
                  title='Street address line 2'
                  onChangeText={t => updateForm('address', 'line2', t)}
                  value={addressForm.line2}
                />
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.col}>
                <Input
                  title='Postal code*'
                  onChangeText={t => updateForm('address', 'postalCode', t)}
                  value={addressForm.postalCode}
                />
              </Col>
              <Col style={styles.col}>
                <Input
                  title='City*'
                  onChangeText={t => updateForm('address', 'city', t)}
                  value={addressForm.city}
                />
              </Col>
            </Row>
            <Row style={styles.row}>
              <Col style={styles.col}>
                <Input
                  title='Phone number (for delivery)'
                  onChangeText={t => updateForm('address', 'phone', t)}
                  value={addressForm.phone}
                />
              </Col>
            </Row>
          </Content>
        </KeyboardAvoidingView>
        <Button
          onPress={this.handleSave}
          text={inModal ? 'Update' : 'Next'}
          disabled={!addressFormIsValid}
          loading={user.loading}
          primary
          full
        />
      </View>
    )
  }
}

CheckoutDelivery.defaultProps = {
  inModal: false,
}

/* eslint-disable react/no-typos */
CheckoutDelivery.wrappedComponent.propTypes = {
  coreData: PropTypes.shape({
    settings: PropTypes.shape({
      shippableCountries: mobxPropTypes.observableArray.isRequired,
    }),
  }).isRequired,
  inModal: PropTypes.bool,
  user: PropTypes.shape({
    data: PropTypes.shape(),
    updateAddresses: PropTypes.func.isRequired,
  }).isRequired,
}

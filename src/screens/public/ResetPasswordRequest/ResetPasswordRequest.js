import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { mainWithFooter } from 'styles/layouts'

import { inject, observer } from 'mobx-react'
import { Button, Input } from 'components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { material } from 'react-native-typography'

@inject('auth')
@observer
export default class ResetPasswordRequest extends React.Component {
  render() {

    const {
      loading,
      resetPasswordRequestForm,
      requestPasswordReset,
      resetPasswordRequestFormIsValid,
      updateForm,
    } = this.props.auth

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={mainWithFooter.container}
        extraScrollHeight={140}
        keyboardShouldPersistTaps='handled'
      >
        <View style={mainWithFooter.main}>
          <Text style={material.display1}>Request Password Reset</Text>
        </View>
        <View style={mainWithFooter.footer}>
          <Input
            title='Email'
            keyboardType='email-address'
            onChangeText={t => updateForm('resetPasswordRequest', 'email', t)}
            value={resetPasswordRequestForm.email}
            maxLength={100}
          />
          <Button
            text='Reset password'
            onPress={requestPasswordReset}
            loading={loading}
            block
            primary
            disabled={!resetPasswordRequestFormIsValid}
            style={{ marginTop: 25 }}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

ResetPasswordRequest.wrappedComponent.propTypes = {
  auth: PropTypes.shape({
    loading: PropTypes.bool,
    requestPasswordReset: PropTypes.func,
    resetPasswordRequestForm: PropTypes.shape({
      email: PropTypes.string,
    }),
    resetPasswordRequestFormIsValid: PropTypes.bool,
    updateForm: PropTypes.func,
  }).isRequired,
}

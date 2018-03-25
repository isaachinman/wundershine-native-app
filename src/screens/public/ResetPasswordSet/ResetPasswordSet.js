import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { mainWithFooter } from 'styles/layouts'

import { inject, observer } from 'mobx-react'
import { Button, Input } from 'components'
import { material } from 'react-native-typography'

@inject('auth', 'routing')
@observer
export default class ResetPasswordSet extends React.Component {

  componentDidMount = () => {
    const { validateResetPasswordToken } = this.props.auth
    const { resetPasswordToken } = this.props.routing.params

    validateResetPasswordToken(resetPasswordToken)
  }

  render() {

    const { resetPasswordToken } = this.props.routing.params

    const {
      loading,
      resetPasswordReturningEmail,
      resetPassword,
      resetPasswordSetForm,
      resetPasswordSetFormIsValid,
      updateForm,
    } = this.props.auth

    return (
      <View style={mainWithFooter.container}>
        <View style={mainWithFooter.main}>
          <Text style={material.display1}>Reset Password</Text>
        </View>
        <View style={mainWithFooter.footer}>
          <Input
            title='Email'
            value={resetPasswordReturningEmail}
            disabled
          />
          <Input
            title='New password'
            onChangeText={t => updateForm('resetPasswordSet', 'password', t)}
            secureTextEntry
            value={resetPasswordSetForm.password}
          />
          <Button
            text='Reset password'
            onPress={() => resetPassword(resetPasswordToken)}
            loading={loading}
            block
            primary
            disabled={!resetPasswordSetFormIsValid}
            style={{ marginTop: 25 }}
          />
        </View>
      </View>
    )
  }
}

ResetPasswordSet.wrappedComponent.propTypes = {
  auth: PropTypes.shape({
    loading: PropTypes.bool,
    resetPassword: PropTypes.func,
    resetPasswordSetForm: PropTypes.shape({
      password: PropTypes.string,
    }),
    resetPasswordSetFormIsValid: PropTypes.bool,
    resetPasswordReturningEmail: PropTypes.string,
    updateForm: PropTypes.func,
    validateResetPasswordToken: PropTypes.func,
  }).isRequired,
  routing: PropTypes.shape({
    params: PropTypes.shape({
      resetPasswordToken: PropTypes.string,
    }),
  }).isRequired,
}

import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'react-native'
import { inject, observer } from 'mobx-react'

import { mainWithFooter } from 'styles/layouts'
import { Button, Input } from 'components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavActions, screenUtils } from 'utils/nav'

import styles from './Login.styles'


@inject('auth')
@screenUtils
@observer
export default class Login extends React.Component {

  static screenTitle = 'Login'

  componentDidMount() {
    this.firstInput.focus()
  }

  render() {

    const {
      loading,
      login,
      loginForm,
      loginFormIsValid,
      updateForm,
    } = this.props.auth

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={mainWithFooter.container}
        extraScrollHeight={140}
        keyboardShouldPersistTaps='handled'
      >
        <View style={mainWithFooter.main} />
        <View style={mainWithFooter.footer}>
          <Input
            title='Email'
            onChangeText={t => updateForm('login', 'email', t)}
            keyboardType='email-address'
            value={loginForm.email}
            maxLength={100}
            ref={x => this.firstInput = x}
          />
          <Input
            title='Password'
            onChangeText={t => updateForm('login', 'password', t)}
            secureTextEntry
            value={loginForm.password}
          />
          <Text
            style={styles.forgotPassword}
            onPress={() => NavActions.push({ screen: 'ResetPasswordRequest' })}
          >
            Forgot password?
          </Text>
          <Button
            text='Login'
            onPress={() => login(loginForm)}
            block
            primary
            disabled={!loginFormIsValid}
            loading={loading}
            style={{ marginTop: 25 }}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

Login.wrappedComponent.propTypes = {
  auth: PropTypes.shape({
    loading: PropTypes.bool,
    loggedIn: PropTypes.bool,
    login: PropTypes.func,
    loginForm: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    loginFormIsValid: PropTypes.bool,
    updateForm: PropTypes.func,
  }).isRequired,
}

import React from 'react'
import PropTypes from 'prop-types'

import { Platform, Text, View } from 'react-native'
import { inject, observer } from 'mobx-react'

import { mainWithFooter } from 'styles/layouts'
import { Button, Input } from 'components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NavActions, screenUtils } from 'utils/nav'
import { blackThemeBG } from 'styles/colours'

import styles from './Login.styles'


@inject('auth')
@screenUtils
@observer
export default class Login extends React.Component {

  static screenTitle = 'Login'

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: blackThemeBG,
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
        contentContainerStyle={styles.container}
        extraScrollHeight={140}
        keyboardShouldPersistTaps='handled'
      >
        <View style={mainWithFooter.main} />
        <View style={mainWithFooter.footer}>
          <Input
            title='Email'
            theme='dark'
            onChangeText={t => updateForm('login', 'email', t)}
            keyboardType='email-address'
            value={loginForm.email}
            maxLength={100}
            autoFocus={Platform.OS !== 'ios'}
          />
          <Input
            title='Password'
            theme='dark'
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

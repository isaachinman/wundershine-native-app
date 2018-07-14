import React from 'react'
import PropTypes from 'prop-types'

import { Platform, View } from 'react-native'

import { Button, Input } from 'components'
import { inject, observer } from 'mobx-react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { mainWithFooter } from 'styles/layouts'
import { screenUtils } from 'utils/nav'

import { whitePrimary } from 'styles/colours'

@inject('auth')
@screenUtils
@observer
export default class Signup extends React.Component {

  static screenTitle = 'Create account'

  componentDidMount() {
    if (Platform.OS === 'ios') {
      setTimeout(() => this.firstInput.focus(), 400)
    } else {
      this.firstInput.focus()
    }
  }

  render() {

    const {
      loading,
      signup,
      signupForm,
      signupFormIsValid,
      updateForm,
    } = this.props.auth

    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{
          backgroundColor: whitePrimary,
          paddingTop: 50,
          paddingBottom: 50,
          paddingLeft: 30,
          paddingRight: 30,
        }}
        extraScrollHeight={140}
        keyboardShouldPersistTaps='handled'
      >
        <View style={mainWithFooter.main} />
        <View style={mainWithFooter.footer}>
          <Input
            title='First name'
            onChangeText={t => updateForm('signup', 'firstName', t)}
            value={signupForm.firstName}
            ref={x => this.firstInput = x}
          />
          <Input
            title='Last name'
            onChangeText={t => updateForm('signup', 'lastName', t)}
            value={signupForm.lastName}
          />
          <Input
            title='Email'
            keyboardType='email-address'
            onChangeText={t => updateForm('signup', 'email', t)}
            value={signupForm.email}
            maxLength={100}
          />
          <Input
            title='Password'
            secureTextEntry
            onChangeText={t => updateForm('signup', 'password', t)}
            value={signupForm.password}
          />
          <Button
            text='Create Account'
            onPress={signup}
            primary
            loading={loading}
            disabled={!signupFormIsValid}
            block
            style={{ marginTop: 25 }}
          />
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

Signup.wrappedComponent.propTypes = {
  auth: PropTypes.shape({
    loading: PropTypes.bool,
    signup: PropTypes.func,
    signupForm: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
    signupFormIsValid: PropTypes.bool,
    updateForm: PropTypes.func,
  }).isRequired,
}

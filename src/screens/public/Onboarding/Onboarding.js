import React from 'react'

import { Button, Logo } from 'components'
import { ImageBackground, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { NavActions } from 'utils/nav'

import heroOnboardingImage from 'images/hero_onboarding.jpg'

import styles from './Onboarding.styles'

export default class Onboarding extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          alwaysBounceVertical={false}
        >
          <View style={styles.overlay} />
          <ImageBackground source={heroOnboardingImage} style={styles.logoContainer}>
            <View style={styles.overlay} />
            <Logo
              type='graphic'
              style={styles.logoGraphic}
            />
            <Logo
              type='text'
              style={styles.logoText}
            />
          </ImageBackground>
          <View style={styles.buttonContainer}>
            <Button
              text='Create Account'
              onPress={() => NavActions.push({ screen: 'Signup' })}
              block
              primary
              style={styles.button}
            />
            <Button
              text='Login'
              onPress={() => NavActions.push({ screen: 'Login' })}
              block
              bordered
              primary
              style={styles.button}
            />
            <TouchableOpacity
              onPress={() => Linking.openURL('http://www.wundershine.com')}
              style={styles.storeLinkContainer}
            >
              <Text style={styles.copyRegular}>
                Don&#x2019;t have a Reframe yet?&nbsp;
              </Text>
              <Text style={styles.copyBold}>
                Get Yours
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

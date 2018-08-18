import React from 'react'

import { Button, Logo } from 'components'
import { ImageBackground, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Text as NativeBaseButtonText } from 'native-base'
import { NavActions } from 'utils/nav'
import { blackThemeBG } from 'styles/colours'

import heroOnboardingImage from 'images/hero_onboarding.jpg'

import styles from './Onboarding.styles'

export default class Onboarding extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
    statusBarColor: '#000000',
    screenBackgroundColor: blackThemeBG,
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          alwaysBounceVertical={false}
        >
          <ImageBackground
            source={heroOnboardingImage}
            style={styles.backgroundContainer}
            resizeMode='cover'
          >
            <View style={styles.imageBackgroundInnerFrame}>
              <View style={styles.logoContainer}>
                <Logo
                  type='graphic'
                  style={styles.logoGraphic}
                />
                <Logo
                  type='text'
                  style={styles.logoText}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  text='Create Account'
                  manualTextInput={(
                    <NativeBaseButtonText style={styles.buttonTextRegular}>
                      Create Account
                    </NativeBaseButtonText>
                  )}
                  onPress={() => NavActions.push({ screen: 'Signup' })}
                  block
                  primary
                  style={styles.button}
                />
                <Button
                  text='Log In'
                  manualTextInput={(
                    <NativeBaseButtonText style={styles.buttonTextLight}>
                      Already have an account?&nbsp;
                      <Text style={styles.buttonTextRegular}>Log In</Text>
                    </NativeBaseButtonText>
                  )}
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
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    )
  }
}

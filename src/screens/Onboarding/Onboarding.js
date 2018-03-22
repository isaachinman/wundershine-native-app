import React from 'react'
import { Text, View } from 'react-native'

import { Button } from 'components'
import { mainWithFooter } from 'styles/layouts'
import { material } from 'react-native-typography'
import { NavActions } from 'utils/nav'

import styles from './Onboarding.styles'

export default class Onboarding extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
  }

  render() {

    return (
      <View style={mainWithFooter.container}>
        <View style={mainWithFooter.main}>
          <Text style={material.display1}>Wundershine 1.0</Text>
        </View>
        <View style={mainWithFooter.footer}>
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
        </View>
      </View>
    )
  }
}

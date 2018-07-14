import React from 'react'

import { ImageBackground } from 'react-native'
import { Logo } from 'components'

import gradientImage from 'images/gradient.png'

import styles from './Splash.styles'

export default class Splash extends React.Component {
  render() {
    return (
      <ImageBackground
        source={gradientImage}
        style={styles.container}
        imageStyle={styles.bgStyle}
      >
        <Logo
          type='graphic'
          style={styles.logo}
        />
      </ImageBackground>
    )
  }
}

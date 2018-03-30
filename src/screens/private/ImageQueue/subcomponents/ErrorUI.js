import React from 'react'
import { Text, View } from 'react-native'

import styles from '../ImageQueue.styles'

export default class EmptyUI extends React.Component {
  render() {
    return (
      <View style={styles.errorUIContainer}>
        <Text style={styles.heading}>Something went wrong!</Text>
        <Text style={styles.subheading}>
          A request to the Wundershine servers seems to have failed.
          Please try again later.
        </Text>
      </View>
    )
  }
}

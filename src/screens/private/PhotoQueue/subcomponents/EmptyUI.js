import React from 'react'
import { Image, Text, View } from 'react-native'

import emptyQueueArrow from '../images/empty_queue_arrow.png'
import styles from '../PhotoQueue.styles'

export default class EmptyUI extends React.Component {
  render() {
    return (
      <View style={styles.emptyUIContainer}>
        <Text style={styles.heading}>Your queue is empty!</Text>
        <Text style={styles.subheading}>
          Tap below to add some pictures to feature in your Reframe.
          You can add more, remove, or edit them anytime.
        </Text>
        <Image
          style={styles.emptyQueueArrow}
          source={emptyQueueArrow}
        />
      </View>
    )
  }
}

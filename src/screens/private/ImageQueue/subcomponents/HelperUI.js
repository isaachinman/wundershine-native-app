import React from 'react'
import PropTypes from 'prop-types'

import { Text, View } from 'react-native'

import styles from '../ImageQueue.styles'

export default class HelperUI extends React.Component {
  render() {
    const { belowLimit } = this.props
    return (
      <View style={styles.helperUIContainer}>
        <Text style={styles.helperUIHeading}>Add as many photos as you like</Text>
        {belowLimit ?
          <Text style={styles.helperUISubheading}>
            With at least 5 images in your queue, you can select
            a pack to be printed and featured in your Reframe!
          </Text>
          :
          <Text style={styles.helperUISubheading}>
            You can also share to your queue from other apps.
            Just tap &#34;share&#34; in your favourite photo or
            creative app!
          </Text>
        }
      </View>
    )
  }
}

HelperUI.propTypes = {
  belowLimit: PropTypes.bool.isRequired,
}


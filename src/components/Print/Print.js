import React from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator, View } from 'react-native'
import { AnimatedImage } from 'react-native-ui-lib'
import { transformedImageURI } from 'utils/images'

import { whiteSecondary } from 'styles/colours'
import styles from './Print.styles'

export default class Print extends React.Component {
  render() {

    const { image, style } = this.props
    const { cloudinaryID, transformation } = image

    const imageSource = transformedImageURI({ cloudinaryID, transformation }, {
      thumbnail: true,
      thumbnailWidth: 200,
      thumbnailHeight: 200,
    })

    return (
      <View
        style={{
          ...styles.paper,
          ...style,
        }}
      >
        <AnimatedImage
          imageStyle={styles.print}
          containerStyle={styles.animatedImageContainer}
          imageSource={{ uri: imageSource }}
          loader={<ActivityIndicator color={whiteSecondary} />}
          animationDuration={200}
        />
      </View>
    )
  }
}

Print.propTypes = {
  image: PropTypes.shape({
    cloudinaryID: PropTypes.string.isRequired,
    transformation: PropTypes.shape().isRequired,
  }).isRequired,
  style: PropTypes.shape().isRequired,
}

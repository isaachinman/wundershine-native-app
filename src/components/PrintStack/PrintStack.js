import React from 'react'
import { propTypes as mobxPropTypes } from 'mobx-react'

import { Print } from 'components'
import { Platform, View } from 'react-native'

import styles from './PrintStack.styles'

export default class PrintStack extends React.Component {
  render() {

    const { images } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.offsetAdjuster}>
          {images.map((image, index) => (
            <Print
              key={`print-${image._id}`}
              image={image}
              zIndex={index}
              style={{
                ...styles.print,
                ...Platform.select({
                  ios: {
                    zIndex: images.length - index,
                    ...styles.shadow,
                  },
                  android: {
                    elevation: images.length - index,
                  },
                }),
                ...styles.offsets[index],
                transform: [
                  { rotate: `${styles.angles[index]}deg` },
                ],
              }}
            />
          ))}
        </View>
      </View>
    )
  }
}

/* eslint-disable react/no-typos */
PrintStack.propTypes = {
  images: mobxPropTypes.observableArray.isRequired,
}

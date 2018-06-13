import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Modal, View } from 'react-native'

import { whitePrimary } from 'styles/colours'
import styles from './Loader.styles'

export default class Loader extends React.Component {
  render() {

    const {
      active,
      contentOnly,
    } = this.props

    if (contentOnly) {

      if (active) {
        return (
          <View style={styles.absoluteContainer}>
            <View style={styles.container}>
              <ActivityIndicator size='large' color={whitePrimary} />
            </View>
          </View>
        )
      }

      return null

    }

    return (
      <Modal
        visible={active}
        transparent
        animationType='none'
        hardwareAccelerated
        onRequestClose={() => {}}
      >
        <View style={styles.container}>
          <ActivityIndicator size='large' color={whitePrimary} />
        </View>
      </Modal>
    )
  }
}

Loader.defaultProps = {
  contentOnly: false,
}

Loader.propTypes = {
  active: PropTypes.bool.isRequired,
  contentOnly: PropTypes.bool,
}

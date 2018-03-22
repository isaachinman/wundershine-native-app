import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Modal, View } from 'react-native'

import { whitePrimary } from 'styles/colours'
import styles from './Loader.styles'

export default class Loader extends React.Component {
  render() {

    const { active } = this.props

    return (
      <Modal
        visible={active}
        transparent
        animationType='fade'
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

Loader.propTypes = {
  active: PropTypes.bool.isRequired,
}

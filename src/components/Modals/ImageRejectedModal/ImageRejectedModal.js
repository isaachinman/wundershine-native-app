import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'

import { Body, Button, Container, Content, Header, Left, Right } from 'native-base'
import { Icon } from 'components'
import { Text, View } from 'react-native'
import { Modal } from 'react-native-ui-lib'

import styles from './ImageRejectedModal.styles'

@inject('ui')
@observer
export default class ImageRejectedModal extends React.Component {

  handleClose = () => this.props.ui.toggleModal('imageRejected', false)

  render() {

    const { ui } = this.props

    return (
      <Modal
        visible={ui.modals.imageRejected.open}
        onRequestClose={this.handleClose}
        animationType='fade'
        hardwareAccelerated
        transparent
      >
        <View style={styles.backdrop} />
        <Container style={styles.container}>
          <Header
            androidStatusBarColor='#dddddd'
            style={styles.header}
          >
            <Left>
              <Button
                onPress={this.handleClose}
                transparent
              >
                <Icon
                  name='close'
                  style={styles.iconClose}
                />
              </Button>
            </Left>
            <Body>
              <Text style={styles.headerTitle}>Image(s) Rejected</Text>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={styles.content}>
            <Text style={styles.contentTitle}>
              Unfortunately, one or more of the images
              you just imported was rejected.
            </Text>
            <Text style={styles.paragraph}>
              Wundershine has these limits in place
              to ensure your prints end up as beautiful
              as possible:
            </Text>
            <Text style={styles.bulletPoint}>
              (1) Smaller than 55mb (filesize)
            </Text>
            <Text style={styles.bulletPoint}>
              (2) Must be jpeg or png format
            </Text>
          </Content>
        </Container>
      </Modal>
    )
  }
}

ImageRejectedModal.wrappedComponent.propTypes = {
  ui: PropTypes.shape({
    toggleModal: PropTypes.func,
  }).isRequired,
}

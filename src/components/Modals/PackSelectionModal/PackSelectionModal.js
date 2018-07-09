import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'

import { Body, Button, Container, Content, Header, Left, Right } from 'native-base'
import { Col, Grid, Row } from 'react-native-easy-grid'
import { Icon } from 'components'
import { Image, Text, TouchableOpacity } from 'react-native'
import { Modal } from 'react-native-ui-lib'

import SQPK05Image from 'images/SQPK05.png'
import SQPK15Image from 'images/SQPK15.png'
import styles from './PackSelectionModal.styles'
import checkImage from './images/check.png'

const productSupplementaryContent = {
  SQPK05: {
    image: SQPK05Image,
    shippingText: 'Includes free global shipping',
  },
  SQPK15: {
    image: SQPK15Image,
    shippingText: 'Includes free global shipping',
  },
}

@inject('coreData', 'queue', 'ui')
@observer
export default class PackSelectionModal extends React.Component {

  handleClose = () => this.props.ui.toggleModal('packSelection', false)

  handlePackChange = (sku) => {
    this.props.queue.changePack(sku)
    setTimeout(() => this.handleClose(), 350)
  }

  render() {

    const { coreData, queue, ui } = this.props

    const packOptions = [
      coreData.products.SQPK05,
      coreData.products.SQPK15,
    ]

    return (
      <Modal
        visible={ui.modals.packSelection.open}
        onRequestClose={this.handleClose}
        animationType='fade'
        hardwareAccelerated
      >
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
              <Text style={styles.headerTitle}>Choose a pack</Text>
            </Body>
            <Right />
          </Header>
          <Content contentContainerStyle={styles.content}>
            <Grid>
              <Row>
                <Col style={{ alignItems: 'center' }}>
                  <Text style={styles.subheading}>
                    Packs of large prints you can swap easily into your Wundershine Reframe.
                  </Text>
                </Col>
              </Row>
              {packOptions.map((pack) => {
                const packIsSelected = queue.data.packSelected === pack.sku
                return (
                  <Row key={pack.sku}>
                    <TouchableOpacity
                      onPress={() => this.handlePackChange(pack.sku)}
                      style={styles.touchableOpacity}
                    >
                      <Row
                        style={packIsSelected ? styles.packRowSelected : styles.packRow}
                      >
                        <Col style={styles.imageContainer}>
                          <Image
                            style={styles.packImage}
                            resizeMode='contain'
                            source={productSupplementaryContent[pack.sku].image}
                          />
                        </Col>
                        <Col style={styles.textContainer}>
                          <Row style={{ flex: 0 }}>
                            <Col><Text style={styles.packTitle}>{pack.name}</Text></Col>
                            {packIsSelected ?
                              <Col>
                                <Image
                                  style={styles.packCheck}
                                  resizeMode='contain'
                                  source={checkImage}
                                />
                              </Col>
                              :
                              null
                            }
                          </Row>
                          <Text style={styles.packPrice}>
                            €{parseInt(pack.shopifyData.price, 0)}
                          </Text>
                          <Text style={styles.packShipping}>
                            {productSupplementaryContent[pack.sku].shippingText}
                          </Text>
                        </Col>
                      </Row>
                    </TouchableOpacity>
                  </Row>
                )
              })}
            </Grid>
          </Content>
        </Container>
      </Modal>
    )
  }
}

PackSelectionModal.wrappedComponent.propTypes = {
  coreData: PropTypes.shape({
    products: PropTypes.shape(),
  }).isRequired,
  queue: PropTypes.shape({
    changePack: PropTypes.func,
    sku: PropTypes.string,
  }).isRequired,
  ui: PropTypes.shape({
    toggleModal: PropTypes.func,
  }).isRequired,
}


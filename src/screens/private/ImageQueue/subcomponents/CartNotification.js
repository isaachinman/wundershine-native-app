import React from 'react'
import PropTypes from 'prop-types'

import { Col, Grid, Row } from 'react-native-easy-grid'
import { Icon } from 'components'
import { inject, observer } from 'mobx-react'
import { Platform, Text, View } from 'react-native'

import { blackPrimary, blackTertiary, greyAccent, whitePrimary, whiteTertiary } from 'styles/colours'
import { material, systemWeights } from 'react-native-typography'

import wundershineProducts from 'wundershine-data/products.json'

const styles = {
  container: {
    backgroundColor: greyAccent,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  textCol: {
    flex: 1,
  },
  title: {
    ...systemWeights.light,
    fontSize: 16,
    color: blackPrimary,
    lineHeight: 22,
  },
  restoreText: {
    ...systemWeights.regular,
    fontSize: 14,
    color: whiteTertiary,
    marginTop: 20,
  },
  iconCol: {
    flex: 0,
    paddingLeft: 30,
    alignItems: 'flex-end',
  },
  iconCart: {
    fontSize: 40,
    color: blackTertiary,
  },
  badge: {
    backgroundColor: blackPrimary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -16,
    marginRight: -8,
    ...Platform.select({
      ios: {
        zIndex: 1,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  badgeText: {
    ...material.buttonObject,
    fontSize: 12,
    color: whitePrimary,
  },
}

@inject('cart')
@observer
export default class CartNotification extends React.Component {
  render() {

    const { cart } = this.props
    const printpackSKUs = Object.values(wundershineProducts).filter(p => p.type === 'printpack').map(p => p.sku)
    const printpacks = cart.data.items.filter(i => printpackSKUs.includes(i.sku))

    const totalImagesInCart = printpacks.reduce((acc, pack) =>
      acc + wundershineProducts[pack.sku].imageQuantity, 0)

    return (
      <Grid>
        <Row style={styles.container}>
          <Col style={styles.textCol}>
            <Text style={styles.title}>
              You have {totalImagesInCart} images in {printpacks.length}&nbsp;
              Reframe print pack(s) in your shopping cart.
            </Text>
            <Text style={styles.restoreText}>
              Restore to Queue
            </Text>
          </Col>
          <Col style={styles.iconCol}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{printpacks.length}</Text>
            </View>
            <Icon
              name='ios-cart'
              style={styles.iconCart}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

CartNotification.propTypes = {
  cart: PropTypes.shape({
    data: PropTypes.shape({
      items: PropTypes.array,
    }),
  }).isRequired,
}

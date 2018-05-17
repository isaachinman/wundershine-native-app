import React from 'react'
import PropTypes from 'prop-types'

import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native'
import { Col, Grid, Row } from 'react-native-easy-grid'
import { Icon, Loader } from 'components'
import { inject, observer, propTypes as mobxPropTypes } from 'mobx-react'
import { NavActions } from 'utils/nav'

import { blackPrimary, blackTertiary, greyAccent, whitePrimary, whiteTertiary } from 'styles/colours'
import { material, systemWeights } from 'react-native-typography'

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

@inject('cart', 'coreData')
@observer
export default class CartNotification extends React.Component {

  componentWillMount() {
    this.printpackSKUs = Object.values(this.props.coreData.products).filter(p => p.type === 'printpack').map(p => p.sku)
  }

  goToCart = () => NavActions.push({ screen: 'Cart' })

  dissolvePrintpacks = async () => {
    Alert.alert(
      'Restore images to queue',
      'Are you sure you want to restore all printpacks in your cart to your queue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            const { cart } = this.props
            const printpackIDs = cart.data.items.filter(i => this.printpackSKUs.includes(i.sku))
              .map(i => i.printpack._id)
            await cart.dissolvePrintpacks(printpackIDs)
          },
        },
      ],
      { cancelable: false },
    )
  }

  render() {

    const { cart, coreData } = this.props
    const printpacks = cart.data.items.filter(i => this.printpackSKUs.includes(i.sku))

    const totalImagesInCart = printpacks.reduce((acc, pack) =>
      acc + (coreData.products[pack.sku].imageQuantity * pack.quantity), 0)

    return (
      <Grid>
        <Loader active={cart.loading} />
        <Row style={styles.container}>
          <Col style={styles.textCol}>
            <Text style={styles.title}>
              You have {totalImagesInCart} images in {printpacks.length}&nbsp;
              Reframe print pack(s) in your shopping cart.
            </Text>
            <Text
              onPress={this.dissolvePrintpacks}
              style={styles.restoreText}
            >
              Restore to Queue
            </Text>
          </Col>
          <Col
            style={styles.iconCol}
          >
            <TouchableOpacity onPress={this.goToCart}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{printpacks.length}</Text>
              </View>
              <Icon
                name='ios-cart'
                style={styles.iconCart}
              />
            </TouchableOpacity>
          </Col>
        </Row>
      </Grid>
    )
  }
}

/* eslint-disable react/no-typos */
CartNotification.wrappedComponent.propTypes = {
  cart: PropTypes.shape({
    data: PropTypes.shape({
      items: mobxPropTypes.observableArray,
    }),
  }).isRequired,
  coreData: PropTypes.shape({
    products: PropTypes.shape(),
  }).isRequired,
}

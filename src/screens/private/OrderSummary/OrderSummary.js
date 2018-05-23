import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer, propTypes as mobxPropTypes } from 'mobx-react'
import { screenUtils } from 'utils/nav'

import { Col, Row } from 'react-native-easy-grid'
import { PrintStack } from 'components'
import { ScrollView, Text, View } from 'react-native'

import styles from './OrderSummary.styles'

@inject('coreData', 'orders')
@screenUtils
@observer
export default class OrderSummary extends React.Component {

  static screenTitle = 'Order summary'

  render() {

    const { coreData, orders, orderID } = this.props
    const order = orders.data.get(orderID)

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.content}
        >
          <View style={styles.itemContainer}>
            {order.items.map((item) => {
              const product = coreData.products[item.sku]
              return (
                <Row key={item.printpack._id} style={styles.itemRow}>
                  <Col style={styles.col1}>
                    <PrintStack
                      images={item.printpack.images}
                    />
                  </Col>
                  <Col style={styles.col2}>
                    <Text style={styles.productName}>
                      {product.name}
                    </Text>
                    <Text style={styles.forFrame}>
                      For Reframe
                    </Text>
                    <Text style={styles.productPrice}>
                      €{(parseFloat(product.shopifyData.price) * item.quantity).toFixed(2)}
                    </Text>
                  </Col>
                </Row>
              )
            })}
          </View>

          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextNormal}>
                DATE
              </Text>
            </Col>
            <Col style={styles.alignRight}>
              <Text style={styles.pricingTextNormal}>
                {new Date(order.createdAt).toLocaleDateString()}
              </Text>
            </Col>
          </Row>
          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextNormal}>
                ORDER ID
              </Text>
            </Col>
            <Col style={styles.alignRight}>
              <Text style={styles.pricingTextNormal}>
                {order._id.substr(order._id.length - 8)}
              </Text>
            </Col>
          </Row>

          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextNormal}>
                SUBTOTAL
              </Text>
            </Col>
            <Col style={styles.alignRight}>
              <Text style={styles.pricingTextNormal}>
                €{order.subtotalPrice.toFixed(2)}
              </Text>
            </Col>
          </Row>
          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextNormal}>
                SHIPPING
              </Text>
            </Col>
            <Col style={styles.alignRight}>
              <Text style={styles.pricingTextNormal}>
                €{order.totalShippingPrice.toFixed(2)}
              </Text>
            </Col>
          </Row>
          <Row style={styles.pricingRow}>
            <Col>
              <Text style={styles.pricingTextBold}>
                TOTAL
              </Text>
            </Col>
            <Col style={styles.alignRight}>
              <Text style={styles.pricingTextBold}>
                €{order.totalPrice.toFixed(2)}
              </Text>
            </Col>
          </Row>
        </ScrollView>
      </View>
    )
  }
}

/* eslint-disable react/no-typos */
OrderSummary.wrappedComponent.propTypes = {
  coreData: PropTypes.shape({
    products: PropTypes.shape({}),
  }).isRequired,
  orderID: PropTypes.string.isRequired,
  orders: PropTypes.shape({
    data: mobxPropTypes.observableMap,
  }).isRequired,
}

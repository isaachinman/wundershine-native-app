import React from 'react'
import PropTypes from 'prop-types'

import { Container, Content, Text } from 'native-base'
import { Icon, Loader } from 'components'
import { FlatList, View } from 'react-native'
import { ListItem } from 'react-native-ui-lib'
import { NavActions, screenUtils } from 'utils/nav'
import { observer, inject } from 'mobx-react'

import { greyAccent } from 'styles/colours'
import styles from './YourOrders.styles'

@inject('orders')
@screenUtils
@observer
export default class YourOrders extends React.Component {

  static screenTitle = 'Your orders'

  render() {

    const { orders } = this.props

    const orderList = []
    orders.data.forEach((order) => {
      if (order.status === 'paid') {
        orderList.push({
          key: order._id,
          ...order,
        })
      }
    })

    return (
      <Container style={styles.content}>
        <Loader
          contentOnly
          active={orders.loading}
        />
        <Content>
          <FlatList
            data={orderList}
            renderItem={({ item }) => {
              const numOfItems = item.items.reduce((acc, i) => acc + i.quantity, 0)
              return (
                <ListItem
                  style={styles.greyBg}
                  activeBackgroundColor={greyAccent}
                  height={100}
                  onPress={() => NavActions.push({ screen: 'OrderSummary', passProps: { orderID: item._id } })}
                >
                  <ListItem.Part middle containerStyle={styles.listItemText}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <Text
                        style={styles.timestamp}
                      >
                        {new Date(item.createdAt).toLocaleDateString()}
                      </Text>
                      <Text
                        style={styles.items}
                      >
                        {numOfItems} {numOfItems === 1 ? 'item' : 'items'}
                      </Text>
                      <Text
                        style={styles.price}
                      >
                        (€{item.totalPrice.toFixed(2)})
                      </Text>
                    </View>
                    <Icon name='keyboard-arrow-right' style={styles.iconArrow} />
                  </ListItem.Part>
                </ListItem>
              )
            }}
          />
        </Content>
      </Container>
    )
  }
}

YourOrders.wrappedComponent.propTypes = {
  orders: PropTypes.shape({
    data: PropTypes.shape(),
  }).isRequired,
}

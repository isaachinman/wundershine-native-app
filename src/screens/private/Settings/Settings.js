import React from 'react'

import { Container, Content, Text } from 'native-base'
import { FlatList, View } from 'react-native'
import { Icon } from 'components'
import { ListItem } from 'react-native-ui-lib'
import { NavActions, screenUtils } from 'utils/nav'

import { greyAccent } from 'styles/colours'
import { material } from 'react-native-typography'
import styles from './Settings.styles'

const routes = [
  {
    screenName: 'PersonalDetails',
    key: 'PersonalDetails',
    displayName: 'Personal details',
    icon: 'ios-contact-outline',
  },
  {
    screenName: 'ShippingDetails',
    key: 'ShippingDetails',
    displayName: 'Shipping address',
    icon: 'ios-cube-outline',
  },
  {
    screenName: 'PaymentMethods',
    key: 'PaymentMethods',
    displayName: 'Payment methods',
    icon: 'ios-card-outline',
  },
]

@screenUtils
export default class Settings extends React.Component {

  static screenTitle = 'Account settings'

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.content}>
          <FlatList
            data={routes}
            renderItem={({ item }) => (
              <ListItem
                style={styles.greyBg}
                activeBackgroundColor={greyAccent}
                height={100}
                onPress={() => NavActions.push({ screen: item.screenName })}
              >
                <ListItem.Part left>
                  <Icon name={item.icon} style={styles.iconLarge} />
                </ListItem.Part>
                <ListItem.Part middle containerStyle={styles.listItemText}>
                  <View style={{ flex: 1 }}>
                    <Text style={material.title}>{item.displayName}</Text>
                  </View>
                  <Icon name='ios-arrow-forward' style={styles.iconArrow} />
                </ListItem.Part>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    )
  }
}

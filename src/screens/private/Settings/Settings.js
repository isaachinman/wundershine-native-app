import React from 'react'
import PropTypes from 'prop-types'

import { Container, Content, Text } from 'native-base'
import { Icon } from 'components'
import { FlatList, View } from 'react-native'
import { ListItem } from 'react-native-ui-lib'
import { NavActions, screenUtils } from 'utils/nav'
import { observer, inject } from 'mobx-react'

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
    screenName: 'ShippingAddress',
    key: 'ShippingAddress',
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

@inject('auth')
@screenUtils
@observer
export default class Settings extends React.Component {

  static screenTitle = 'Account settings'

  render() {
    return (
      <Container style={styles.content}>
        <Content>
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
          <ListItem
            style={styles.greyBg}
            activeBackgroundColor={greyAccent}
            height={100}
            onPress={() => this.props.auth.logout()}
          >
            <ListItem.Part left>
              <Icon name='ios-log-out' style={styles.iconLogout} />
            </ListItem.Part>
            <ListItem.Part middle containerStyle={styles.listItemText}>
              <View style={{ flex: 1 }}>
                <Text style={material.title}>Logout</Text>
              </View>
            </ListItem.Part>
          </ListItem>
        </Content>
      </Container>
    )
  }
}

Settings.wrappedComponent.propTypes = {
  auth: PropTypes.shape({
    logout: PropTypes.func,
  }).isRequired,
}

import React from 'react'
import PropTypes from 'prop-types'

import { Container, Content, Text } from 'native-base'
import { FlatList } from 'react-native'
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
  },
  {
    screenName: 'ShippingAddress',
    key: 'ShippingAddress',
    displayName: 'Shipping address',
  },
  {
    screenName: 'PaymentMethods',
    key: 'PaymentMethods',
    displayName: 'Payment methods',
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
                activeBackgroundColor={greyAccent}
                height={70}
                onPress={() => NavActions.push({ screen: item.screenName })}
              >
                <ListItem.Part middle containerStyle={styles.listItemText}>
                  <Text style={material.title}>{item.displayName}</Text>
                </ListItem.Part>
              </ListItem>
            )}
          />
          <ListItem
            activeBackgroundColor={greyAccent}
            height={70}
            onPress={() => this.props.auth.logout()}
          >
            <ListItem.Part middle containerStyle={styles.listItemText}>
              <Text style={material.title}>Logout</Text>
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

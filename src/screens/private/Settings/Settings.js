import React from 'react'
import PropTypes from 'prop-types'

import { Container, Content, Text } from 'native-base'
import { FlatList } from 'react-native'
import { ListItem } from 'react-native-ui-lib'
import { NavActions, screenUtils } from 'utils/nav'
import { observer, inject } from 'mobx-react'

import { greyAccent } from 'styles/colours'
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
                height={60}
                onPress={() => NavActions.push({ screen: item.screenName })}
              >
                <ListItem.Part middle containerStyle={styles.listItemText}>
                  <Text style={styles.textLabel}>{item.displayName}</Text>
                </ListItem.Part>
              </ListItem>
            )}
          />
          <ListItem
            activeBackgroundColor={greyAccent}
            height={60}
            onPress={() => this.props.auth.logout()}
          >
            <ListItem.Part middle containerStyle={styles.listItemText}>
              <Text style={styles.textLabel}>Logout</Text>
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

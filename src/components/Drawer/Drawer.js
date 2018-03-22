import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'components'
import { Body, Container, Content, Footer, FooterTab, Header, Title } from 'native-base'
import { ListItem } from 'react-native-ui-lib'
import { FlatList, Text, View } from 'react-native'
import { observer, inject } from 'mobx-react'
import { NavActions } from 'utils/nav'

import { greyAccent } from 'styles/colours'
import { material } from 'react-native-typography'
import styles from './Drawer.styles'

const routes = [
  {
    screenName: 'PhotoQueue',
    key: 'PhotoQueue',
    displayName: 'Queue',
    icon: 'ios-images-outline',
  },
  {
    screenName: 'Settings',
    key: 'Settings',
    displayName: 'Settings',
    icon: 'ios-contact-outline',
  },
]

@inject('auth')
@observer
export default class Drawer extends React.Component {


  handleNavAction = (action) => {
    NavActions.toggleDrawer({ side: 'left' })
    action()
  }

  handleLogout = () => {
    NavActions.toggleDrawer({ side: 'left' })
    this.props.auth.logout()
  }

  handleRedirect = (screen) => {
    NavActions.toggleDrawer({ side: 'left' })
    NavActions.push({ screen })
  }

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor='#dddddd'
          style={styles.header}
        >
          <Body>
            <Title style={styles.blackText}>Wundershine</Title>
          </Body>
        </Header>
        <Content style={styles.content}>
          <FlatList
            data={routes}
            renderItem={({ item }) => (
              <ListItem
                activeBackgroundColor={greyAccent}
                height={100}
                onPress={() => this.handleRedirect(item.screenName)}
              >
                <ListItem.Part left>
                  <Icon name={item.icon} style={styles.iconLarge} />
                </ListItem.Part>
                <ListItem.Part middle column>
                  <View style={styles.listItemText}>
                    <Text style={material.title}>{item.displayName}</Text>
                  </View>
                </ListItem.Part>
              </ListItem>
            )}
          />
        </Content>
        <Footer style={styles.footer}>
          <FooterTab>
            <Button
              text='Log out'
              onPress={this.handleLogout}
              full
              info
            />
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

Drawer.wrappedComponent.propTypes = {
  auth: PropTypes.shape({
    logout: PropTypes.func,
  }).isRequired,
}

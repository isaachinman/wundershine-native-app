import React from 'react'
import { Icon, Logo } from 'components'
import { Body, Container, Content, Header } from 'native-base'
import { ListItem } from 'react-native-ui-lib'
import { FlatList, Linking, Text, View } from 'react-native'
import { NavActions } from 'utils/nav'

import { greyAccent } from 'styles/colours'
import styles from './Drawer.styles'

const routes = [
  {
    key: 'ImageQueue',
    displayName: 'Queue',
    icon: 'filter',
    redirect: () => NavActions.push({ screen: 'ImageQueue' }),
  },
  {
    key: 'YourOrders',
    displayName: 'Your Orders',
    icon: 'assignment-turned-in',
    redirect: () => NavActions.push({ screen: 'YourOrders' }),
  },
  {
    key: 'Frame Shop',
    displayName: 'Frame Shop',
    icon: 'store',
    redirect: () => Linking.openURL('http://www.wundershine.com'),
  },
  {
    key: 'Settings',
    displayName: 'Settings',
    icon: 'account-box',
    redirect: () => NavActions.push({ screen: 'Settings' }),
  },
]

export default class Drawer extends React.Component {

  handleRedirect = (redirect) => {
    NavActions.toggleDrawer({ side: 'left' })
    redirect()
  }

  render() {
    return (
      <Container>
        <Header
          androidStatusBarColor='#dddddd'
          style={styles.header}
        >
          <Body>
            <View style={styles.logoContainer}>
              <Logo
                name='wundershine_logo_graphic'
                style={styles.logoGraphic}
              />
              <Logo
                name='wundershine_logo_text'
                style={styles.logoText}
              />
            </View>
          </Body>
        </Header>
        <Content style={styles.content}>
          <FlatList
            data={routes}
            renderItem={({ item }) => (
              <ListItem
                activeBackgroundColor={greyAccent}
                height={80}
                onPress={() => this.handleRedirect(item.redirect)}
              >
                <ListItem.Part left>
                  <Icon name={item.icon} style={styles.iconLarge} />
                </ListItem.Part>
                <ListItem.Part middle column>
                  <View style={styles.listItemText}>
                    <Text style={styles.text}>{item.displayName}</Text>
                  </View>
                </ListItem.Part>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    )
  }
}

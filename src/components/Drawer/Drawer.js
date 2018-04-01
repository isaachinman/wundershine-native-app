import React from 'react'
import { Icon } from 'components'
import { Body, Container, Content, Header, Title } from 'native-base'
import { ListItem } from 'react-native-ui-lib'
import { FlatList, Linking, Text, View } from 'react-native'
import { NavActions } from 'utils/nav'

import { greyAccent } from 'styles/colours'
import { material } from 'react-native-typography'
import styles from './Drawer.styles'

const routes = [
  {
    key: 'ImageQueue',
    displayName: 'Queue',
    icon: 'ios-images-outline',
    redirect: () => NavActions.push({ screen: 'ImageQueue' }),
  },
  {
    key: 'Settings',
    displayName: 'Settings',
    icon: 'ios-contact-outline',
    redirect: () => NavActions.push({ screen: 'Settings' }),
  },
  {
    key: 'Coupons',
    displayName: 'Coupons',
    icon: 'ios-pricetags-outline',
    redirect: () => NavActions.push({ screen: 'Settings' }),
  },
  {
    key: 'Frame Shop',
    displayName: 'Frame Shop',
    icon: 'ios-albums-outline',
    redirect: () => Linking.openURL('http://www.wundershine.com'),
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
            <Title style={styles.title}>WUNDERSHINE</Title>
          </Body>
        </Header>
        <Content style={styles.content}>
          <FlatList
            data={routes}
            renderItem={({ item }) => (
              <ListItem
                activeBackgroundColor={greyAccent}
                height={100}
                onPress={() => this.handleRedirect(item.redirect)}
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
      </Container>
    )
  }
}

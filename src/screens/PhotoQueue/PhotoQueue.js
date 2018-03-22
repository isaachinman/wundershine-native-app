import React from 'react'
import PropTypes from 'prop-types'

import { Body, Button, Container, Content, Header, Left, Right } from 'native-base'
import { Text } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Icon } from 'components'
import PackSelectionModal from 'components/PackSelectionModal/PackSelectionModal'
import { NavActions } from 'utils/nav'
import { wundershineProducts } from 'data'

import { EmptyUI, LoadingUI } from './subcomponents'
import styles from './PhotoQueue.styles'

@inject('cart', 'initialisation', 'ui')
@observer
export default class PhotoQueue extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
  }

  handleLaunchImagePicker = async () => {
  }


  render() {

    const { cart, initialisation, ui } = this.props

    return (
      <Container>
        <Header
          androidStatusBarColor='#dddddd'
          style={styles.header}
        >
          <Left>
            <Button
              onPress={() => NavActions.toggleDrawer({ side: 'left' })}
              transparent
            >
              <Icon name='ios-menu' style={styles.iconMenu} />
            </Button>
          </Left>
          <Body style={styles.headerBody}>
            <Text style={styles.headerTitle}>Queue</Text>
          </Body>
          <Right style={styles.right}>
            <Button
              transparent
              onPress={() => ui.toggleModal('packSelection', true)}
            >
              <Text style={styles.packPickerSelectionText}>
                {wundershineProducts[cart.sku].title}
              </Text>
              <Text style={styles.packPickerArrow}>&#x25BC;</Text>
            </Button>
            <Button transparent>
              <Text>Next</Text>
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.content}>
          {initialisation.appIsInitialised ?
            <EmptyUI />
            :
            <LoadingUI />
          }
          <Button
            style={styles.circularButton}
            active
            onPress={this.handleLaunchImagePicker}
          >
            <Icon name='ios-add' style={styles.circularButtonIcon} />
          </Button>
        </Content>
        <PackSelectionModal />
      </Container>
    )
  }
}

PhotoQueue.wrappedComponent.propTypes = {
  cart: PropTypes.shape({
    sku: PropTypes.string,
  }).isRequired,
  initialisation: PropTypes.shape({
    appIsInitialised: PropTypes.bool,
  }).isRequired,
  ui: PropTypes.shape({
    toggleModal: PropTypes.func,
  }).isRequired,
}

import React from 'react'
import PropTypes from 'prop-types'

import { Body, Button, Container, Content, Header, Left, Right } from 'native-base'
import { FlatList, Text, View } from 'react-native'
import { inject, observer, propTypes as mobxPropTypes } from 'mobx-react'
import { Icon } from 'components'
import { ImageRejectedModal, PackSelectionModal } from 'components/Modals'
import { NavActions } from 'utils/nav'
import wundershineProducts from 'wundershine-data/products.json'

import { EmptyUI, ErrorUI, LoadingUI, QueueItem } from './subcomponents'
import styles from './ImageQueue.styles'

@inject('cart', 'initialisation', 'queue', 'ui')
@observer
export default class ImageQueue extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
  }

  componentDidUpdate = () => {
    /* Upload images automatically */
    const { queue } = this.props
    if (queue.imagesToUpload.length > 0 && !queue.currentlyUploading) {
      queue.uploadImage()
    }
  }

  handleLaunchImagePicker = async () => {
  }

  render() {

    const {
      cart,
      initialisation,
      queue,
      ui,
    } = this.props

    /* UI Display Logic */
    let showErrorUI = false
    let showLoadingUI = false
    let showQueueUI = false
    let showEmptyUI = false

    if (queue.error) {
      showErrorUI = true
    } else {
      if (initialisation.appIsInitialised) { // eslint-disable-line no-lonely-if
        if (queue.data.square.images.length > 0) {
          showQueueUI = true
        } else {
          showEmptyUI = true
        }
      } else {
        showLoadingUI = true
      }
    }

    return (
      <Container>
        <View key={queue.currentlyUploading} />
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
                {wundershineProducts[cart.sku].name}
              </Text>
              <Text style={styles.packPickerArrow}>&#x25BC;</Text>
            </Button>
            <Button transparent>
              <Text>Next</Text>
            </Button>
          </Right>
        </Header>
        <Content contentContainerStyle={styles.content}>
          {showLoadingUI &&
            <LoadingUI />
          }
          {showQueueUI &&
            <FlatList
              data={queue.data.square.images.map(x => ({ ...x, key: x._id }))}
              renderItem={({ item }) =>
                <QueueItem {...item} deleteImage={queue.deleteImage} key={item.key} />}
            />
          }
          {showEmptyUI &&
            <EmptyUI />
          }
          {showErrorUI &&
            <ErrorUI />
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
        <ImageRejectedModal />
      </Container>
    )
  }
}

ImageQueue.wrappedComponent.propTypes = {
  cart: PropTypes.shape({
    sku: PropTypes.string,
  }).isRequired,
  initialisation: PropTypes.shape({
    appIsInitialised: PropTypes.bool,
  }).isRequired,
  queue: PropTypes.shape({
    currentlyUploading: PropTypes.bool,
    data: PropTypes.shape({
      square: PropTypes.shape({
        packSelected: PropTypes.string,
        images: mobxPropTypes.observableArray, // eslint-disable-line react/no-typos
      }),
    }),
  }).isRequired,
  ui: PropTypes.shape({
    toggleModal: PropTypes.func,
  }).isRequired,
}

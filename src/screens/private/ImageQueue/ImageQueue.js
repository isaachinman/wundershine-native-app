import React from 'react'
import PropTypes from 'prop-types'

import { Body, Button, Container, Header, Left, Right } from 'native-base'
import { Dimensions, FlatList, RefreshControl, Text, View } from 'react-native'
import { inject, observer, propTypes as mobxPropTypes } from 'mobx-react'
import { Icon } from 'components'
import ImagePicker from 'react-native-image-crop-picker'
import { ImageRejectedModal, PackSelectionModal } from 'components/Modals'
import { NavActions } from 'utils/nav'
import { Placeholder } from 'react-native-loading-placeholder'

import { whiteSecondary } from 'styles/colours'

import {
  CartNotification,
  EmptyUI,
  ErrorUI,
  LoadingUI,
  HelperUI,
  PlaceholderContainer,
  QueueItem,
} from './subcomponents'

import styles from './ImageQueue.styles'

import { QUEUE_ITEM_HEIGHT } from './constants'

@inject('cart', 'coreData', 'initialisation', 'queue', 'ui')
@observer
export default class ImageQueue extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
  }

  /*
    Temporary work around due to difficulty comparing props
    across renders with MobX:
    https://stackoverflow.com/questions/37185889/comparing-this-props-prop-and-nextprops-prop-with-mobx
  */
  state = { didScrollToBottom: false }

  componentDidUpdate() {
    /* Upload images automatically */
    const { queue } = this.props
    const { didScrollToBottom } = this.state
    if (queue.imagesToUpload.length > 0 && !queue.currentlyUploading) {
      queue.uploadImage()

      /* Scroll to bottom when new items are added */
      if (!didScrollToBottom) {
        const queueLength = queue.data.images.length
        const screenHeight = Dimensions.get('window').height
        if ((queueLength * QUEUE_ITEM_HEIGHT) + 100 >= screenHeight && this.flatlist) {
          setTimeout(() => this.flatlist.scrollToEnd(), 500)
        }
        this.setState({ didScrollToBottom: true }) // eslint-disable-line
      }
    } else if (queue.imagesToUpload.length === 0 && didScrollToBottom) {
      this.setState({ didScrollToBottom: false }) // eslint-disable-line
    }
  }

  handleRefresh = async () => {
    const { queue } = this.props
    queue.setRefreshing(true)
    await queue.getQueue()
    queue.setRefreshing(false)
  }

  handleLaunchImagePicker = async () => {
    try {
      const images = await ImagePicker.openPicker({
        multiple: true,
        includeExif: true,
        maxFiles: 15,
        mediaType: 'photo',
        smartAlbums: ['UserLibrary', 'RecentlyAdded', 'PhotoStream', 'Generic', 'Favorites', 'SelfPortraits', 'LongExposure'],
      })
      this.props.queue.addImagesToUpload(images)
    } catch (error) {
      if (error.toString().includes('User cancelled image selection')) {
        // Handle user cancelled selection
      }
    }
  }

  render() {

    const {
      cart,
      coreData,
      initialisation,
      queue,
      ui,
    } = this.props

    const { images, packSelected } = queue.data

    /* UI Display Logic */
    let showErrorUI = false
    let showLoadingUI = false
    let showQueueUI = false
    let showEmptyUI = false
    let queueIsProcessable = false

    /* Assemble items for flatlist and add helper ui text */
    /* Prefer localID as key to prevent flicker of imported images after upload */
    /* Prefer _id as _id to allow API actions on newly-uploaded images */
    const queueItems = queue.data.images.map(item => ({
      ...item,
      key: item.localID || item._id,
      _id: item._id || item.localID,
      loading: queue.imagesLoading.includes(item._id),
    }))

    // Add cart notification UI to top of queue
    if (cart.data.items.length > 0) {
      queueItems.unshift({ key: 'cart-ui' })
    }

    // Add helper UI to end of queue
    if (images.length > 0) {
      queueItems.push({ key: 'helper-ui' })
    }

    if (queue.error) {
      showErrorUI = true
    } else {
      if (initialisation.appIsInitialised) { // eslint-disable-line no-lonely-if
        if (images.length > 0 || cart.data.items.length > 0) {
          showQueueUI = true
          queueIsProcessable = coreData.products[packSelected].imageQuantity <=
            images.filter(x => !x.notUploadedYet).length
        } else if (images.length === 0 && cart.data.items.length === 0) {
          showEmptyUI = true
        }
      } else {
        showLoadingUI = true
      }
    }

    return (
      <PlaceholderContainer>
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
                <Icon name='menu' style={styles.iconMenu} />
              </Button>
            </Left>
            <Body style={styles.headerBody}>
              <Text style={styles.headerTitle}>Queue</Text>
            </Body>
            <Right style={styles.right}>
              <Button
                onPress={() => ui.toggleModal('packSelection', true)}
                transparent
              >
                {showLoadingUI ?
                  <Placeholder style={styles.packnamePlaceholder} />
                :
                  <Text style={styles.packPickerSelectionText}>
                    {coreData.products[packSelected].name.toUpperCase()}
                  </Text>
                }
                <Icon name='arrow-drop-down' style={styles.packPickerArrow} />
              </Button>
              <Button
                onPress={() => NavActions.showModal({ screen: 'PackReview' })}
                disabled={!queueIsProcessable}
                transparent
              >
                <Text style={queueIsProcessable ? styles.nextEnabled : styles.nextDisabled}>
                  NEXT
                </Text>
              </Button>
            </Right>
          </Header>
          <View style={styles.content}>
            {showLoadingUI && <LoadingUI />}
            {showEmptyUI && <EmptyUI />}
            {showErrorUI && <ErrorUI />}
            {showQueueUI &&
              <FlatList
                ref={x => this.flatlist = x}
                scrollEventThrottle={1}
                refreshControl={(
                  <RefreshControl
                    refreshing={queue.refreshing}
                    onRefresh={this.handleRefresh}
                    tintColor={whiteSecondary}
                  />
                )}
                contentContainerStyle={styles.flatlist}
                data={queueItems}
                renderItem={({ item }) => {
                  if (item.key === 'cart-ui') {
                      return <CartNotification key={item.key} />
                  } else if (item.key === 'helper-ui') {
                    return (
                      <HelperUI
                        key={item.key}
                        belowLimit={images.length < 5}
                      />
                    )
                  }
                  return (
                    <QueueItem
                      {...item}
                      deleteImage={queue.deleteImage}
                      selectImage={queue.selectImage}
                      deselectImage={queue.deselectImage}
                      updateImageTransformation={queue.updateImageTransformation}
                      selectionActionsAllowed={queue.selectionActionsAllowed}
                      key={item.key}
                    />
                  )
                }}
              />
            }
            <Button
              style={styles.circularButton}
              active
              onPress={this.handleLaunchImagePicker}
            >
              <Text style={styles.iconPlus}>+</Text>
            </Button>
          </View>
          <PackSelectionModal />
          <ImageRejectedModal />
        </Container>
      </PlaceholderContainer>
    )
  }
}

/* eslint-disable react/no-typos */
ImageQueue.wrappedComponent.propTypes = {
  cart: PropTypes.shape({
    data: PropTypes.shape({
      items: mobxPropTypes.observableArray,
    }),
  }).isRequired,
  coreData: PropTypes.shape({
    products: PropTypes.shape(),
  }).isRequired,
  initialisation: PropTypes.shape({
    appIsInitialised: PropTypes.bool,
  }).isRequired,
  queue: PropTypes.shape({
    addImagesToUpload: PropTypes.func,
    currentlyUploading: PropTypes.bool,
    data: PropTypes.shape({
      images: mobxPropTypes.observableArray,
      square: PropTypes.shape({
        packSelected: PropTypes.string,
        images: mobxPropTypes.observableArray,
      }),
    }),
  }).isRequired,
  ui: PropTypes.shape({
    toggleModal: PropTypes.func,
  }).isRequired,
}

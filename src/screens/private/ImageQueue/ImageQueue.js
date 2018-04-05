import React from 'react'
import PropTypes from 'prop-types'

import { Body, Button, Container, Header, Left, Right } from 'native-base'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { inject, observer, propTypes as mobxPropTypes } from 'mobx-react'
import { Icon } from 'components'
import { ImageRejectedModal, PackSelectionModal } from 'components/Modals'
import { NavActions } from 'utils/nav'
import wundershineProducts from 'wundershine-data/products.json'

import { whiteSecondary } from 'styles/colours'

import {
  EmptyUI,
  ErrorUI,
  LoadingUI,
  HelperUI,
  QueueItem,
} from './subcomponents'

import styles from './ImageQueue.styles'

import { QUEUE_ITEM_HEIGHT, QUEUE_PADDING_BOTTOM } from './constants'

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

  handleRefresh = async () => {
    const { queue } = this.props
    queue.setRefreshing(true)
    await queue.getQueue()
    queue.setRefreshing(false)
  }

  handleLaunchImagePicker = async () => {
  }

  render() {

    const {
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
    let packSelectedName = null

    /* Assemble items for flatlist and add helper ui text */
    /* Prefer localID as key to prevent flicker of imported images after upload */
    /* Prefer _id as _id to allow API actions on newly-uploaded images */
    const queueItems = queue.data.images.map(item => ({
      ...item,
      key: item.localID || item._id,
      _id: item._id || item.localID,
      loading: queue.imagesLoading.includes(item._id),
    }))
    queueItems.push({ key: 'helper-ui' })
    const queueHelperUIVisible = ui.animatables.queueHelperUI.visible

    if (queue.error) {
      showErrorUI = true
    } else {
      if (initialisation.appIsInitialised) { // eslint-disable-line no-lonely-if
        if (images.length > 0) {
          showQueueUI = true
          queueIsProcessable = wundershineProducts[packSelected].imageQuantity <= images.length
        } else {
          showEmptyUI = true
        }
        packSelectedName = wundershineProducts[packSelected].name
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
                {packSelectedName}
              </Text>
              <Text style={styles.packPickerArrow}>&#x25BC;</Text>
            </Button>
            <Button
              disabled={!queueIsProcessable}
              transparent
            >
              <Text style={queueIsProcessable ? {} : styles.nextDisabled}>NEXT</Text>
            </Button>
          </Right>
        </Header>
        <View style={styles.content}>
          {showLoadingUI && <LoadingUI />}
          {showEmptyUI && <EmptyUI />}
          {showErrorUI && <ErrorUI />}
          {showQueueUI &&
            <FlatList
              scrollEventThrottle={16}
              onLayout={(e) => {
                const { height } = e.nativeEvent.layout
                if (height > (images.length * QUEUE_ITEM_HEIGHT) + QUEUE_PADDING_BOTTOM) {
                  ui.setAnimatable('queueHelperUI', 'visible', true)
                }
                ui.setDimension('queueLayoutHeight', height)
              }}
              onContentSizeChange={(width, height) => {
                if (height - QUEUE_PADDING_BOTTOM > ui.dimensions.queueLayoutHeight) {
                  ui.setAnimatable('queueHelperUI', 'visible', false)
                } else if (!ui.animatables.queueHelperUI.visible) {
                  ui.setAnimatable('queueHelperUI', 'visible', true)
                }
              }}
              onScroll={(e) => {
                const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent
                const atBottom = layoutMeasurement.height + contentOffset.y >=
                  (contentSize.height - QUEUE_PADDING_BOTTOM)
                if (atBottom) {
                  ui.setAnimatable('queueHelperUI', 'visible', true)
                } else if (ui.animatables.queueHelperUI.visible) {
                  ui.setAnimatable('queueHelperUI', 'visible', false)
                }
              }}
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
                if (item.key === 'helper-ui') {
                  return (
                    <HelperUI
                      key={item.key}
                      belowLimit={images.length < 5}
                      visible={queueHelperUIVisible}
                    />
                  )
                }
                return (
                  <QueueItem
                    {...item}
                    deleteImage={queue.deleteImage}
                    selectImage={queue.selectImage}
                    deselectImage={queue.deselectImage}
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
            <Icon name='ios-add' style={styles.circularButtonIcon} />
          </Button>
        </View>
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

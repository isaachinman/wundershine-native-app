import React from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { AnimatedImage, ListItem } from 'react-native-ui-lib'
import { cloudinary } from 'utils/images'
import { Col, Row } from 'react-native-easy-grid'
import { Icon } from 'components'
import { NavActions } from 'utils/nav'

import Interactable from 'react-native-interactable'

import { blackSecondary, greyAccent, whiteSecondary } from 'styles/colours'
import { material } from 'react-native-typography'

import { QUEUE_ITEM_HEIGHT, QUEUE_IMAGE_DIMENSION, QUEUE_ICON_SIZE } from '../constants'

const styles = {
  container: {
    padding: 15,
    minHeight: QUEUE_ITEM_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: greyAccent,
  },
  textContainer: {
    paddingLeft: 15,
  },
  titleContainer: {
    paddingRight: 15,
  },
  loadingImageOverlay: {
    width: QUEUE_IMAGE_DIMENSION,
    height: QUEUE_IMAGE_DIMENSION,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    ...material.titleObject,
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10,
  },
  importText: {
    ...material.captionObject,
    fontStyle: 'italic',
  },
  animatedImageContainerStyle: {
    width: QUEUE_IMAGE_DIMENSION,
    height: QUEUE_IMAGE_DIMENSION,
    backgroundColor: greyAccent,
  },
  animatedImageStyle: {
    resizeMode: 'cover',
    height: QUEUE_IMAGE_DIMENSION,
  },
  iconSelected: {
    width: 28,
    height: 38,
    fontSize: QUEUE_ICON_SIZE,
    color: blackSecondary,
  },
  iconDeselected: {
    width: 28,
    height: 38,
    fontSize: QUEUE_ICON_SIZE,
    color: whiteSecondary,
  },
  loadingIconContainer: {
    paddingTop: 7,
    width: 28,
    height: 38,
  },
  slideoutContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
    flexDirection: 'row',
  },
  iconSlideout: {
    fontSize: 28,
    color: blackSecondary,
    paddingRight: 50,
  },
  iconMore: {
    color: whiteSecondary,
    opacity: 0.8,
    marginRight: 5,
    fontSize: 28,
    alignSelf: 'flex-end',
  },
}

export default class QueueItem extends React.Component {

  openSlideout = () => {
    this.snapper.snapTo({ index: 1 })
  }

  redirectToEditScreen = () => {
    NavActions.setDrawerEnabled({ side: 'left', enabled: false })
    NavActions.push({ screen: 'EditImage', passProps: { _id: this.props._id } })
  }

  handleSlideoutAction = (action) => {
    this.snapper.snapTo({ index: 0 })
    action()
  }

  render() {

    const {
      _id,
      deleteImage,
      deselectImage,
      cloudinaryID,
      loading,
      name,
      notUploadedYet,
      metaData,
      selected,
      selectImage,
      selectionActionsAllowed,
      uri,
      uriIsLocal,
    } = this.props

    const imageSource = notUploadedYet || uriIsLocal ? uri :
      cloudinary.url(cloudinaryID, { width: 400, crop: 'scale' })

    const selectionIcon = selected ? 'ios-checkmark-circle-outline' : 'ios-radio-button-off'
    const selectionIconStyle = selected ? styles.iconSelected : styles.iconDeselected
    const selectionIconAction = selected ? deselectImage : selectImage

    // Determine origin text
    let origin = null
    const { make, model } = metaData
    if (make && model) {
      if (new RegExp(`\\b${make.replace(/\s+/g, '|')}\\b`, 'i').test(model)) {
        origin = model
      } else {
        origin = `${make} ${model}`
      }
    }

    return (
      <View>
        <Interactable.View
          horizontalOnly
          snapPoints={[{ x: 0 }, { x: -190 }]}
          frictionAreas={[{ damping: 0.85, influenceArea: { top: 0 } }]}
          ref={x => this.snapper = x}
        >
          <ListItem
            activeBackgroundColor={greyAccent}
            height={100}
            onPress={this.redirectToEditScreen}
            containerStyle={styles.container}
          >
            <ListItem.Part left>
              <AnimatedImage
                containerStyle={styles.animatedImageContainerStyle}
                imageStyle={styles.animatedImageStyle}
                imageSource={{ uri: imageSource }}
                loader={<ActivityIndicator color={whiteSecondary} />}
                animationDuration={200}
              />
              {notUploadedYet &&
                <View style={styles.loadingImageOverlay}>
                  <ActivityIndicator color={whiteSecondary} />
                </View>
              }
            </ListItem.Part>
            <ListItem.Part middle column containerStyle={styles.textContainer}>
              <Row>
                <Col style={styles.titleContainer}>
                  <Text style={styles.imageTitle}>{name}</Text>
                  {notUploadedYet ?
                    <Text style={styles.importText}>Import in progress...</Text>
                    :
                    <View>
                      <Text style={material.caption}>{origin || 'iPhone X'}</Text>
                    </View>
                  }
                </Col>
                <Col style={{ flex: 0, justifyContent: 'space-between' }}>
                  {loading ?
                    <View style={styles.loadingIconContainer}>
                      <ActivityIndicator color={whiteSecondary} />
                    </View>
                    :
                    <TouchableOpacity
                      disabled={!selectionActionsAllowed}
                      onPress={() => selectionIconAction(_id)}
                    >
                      <Icon name={selectionIcon} style={selectionIconStyle} />
                    </TouchableOpacity>
                  }
                  <TouchableOpacity
                    onPress={this.openSlideout}
                  >
                    <Icon name='ios-more' style={styles.iconMore} />
                  </TouchableOpacity>
                </Col>
              </Row>
            </ListItem.Part>
          </ListItem>
        </Interactable.View>
        <View style={styles.slideoutContainer}>
          <TouchableOpacity onPress={() => this.handleSlideoutAction(this.redirectToEditScreen)}>
            <Icon name='ios-crop-outline' style={styles.iconSlideout} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSlideoutAction(deleteImage.bind(null, _id))}>
            <Icon name='ios-trash-outline' style={styles.iconSlideout} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

QueueItem.defaultProps = {
  cloudinaryID: null,
  notUploadedYet: false,
  uriIsLocal: false,
}

QueueItem.propTypes = {
  _id: PropTypes.string.isRequired,
  cloudinaryID: PropTypes.string,
  deleteImage: PropTypes.func.isRequired,
  deselectImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  notUploadedYet: PropTypes.bool,
  metaData: PropTypes.shape({
    dpi: PropTypes.number,
    make: PropTypes.string,
    model: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  selectionActionsAllowed: PropTypes.bool.isRequired,
  selectImage: PropTypes.func.isRequired,
  uri: PropTypes.string.isRequired,
  uriIsLocal: PropTypes.bool,
}

import React from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { AnimatedImage, ListItem } from 'react-native-ui-lib'
import { pixelScore, transformedImageURI } from 'utils/images'
import { Col, Row } from 'react-native-easy-grid'
import { Icon } from 'components'
import { Menu, MenuTrigger, MenuOptions, renderers } from 'react-native-popup-menu'
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
  },
  animatedImageStyle: {
    resizeMode: 'contain',
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
  pixelScoreTitle: {
    ...material.captionObject,
  },
  iconPixelScoreLimited: {
    fontSize: 16,
    marginLeft: 3,
    color: blackSecondary,
  },
  pixelScoreLimitedText: {
    padding: 15,
  },
}

export default class QueueItem extends React.Component {

  openSlideout = () => {
    this.snapper.snapTo({ index: 1 })
  }

  redirectToEditScreen = () => {
    const { loading, notUploadedYet } = this.props
    if (!loading && !notUploadedYet) {
      NavActions.push({ screen: 'EditImage', passProps: { _id: this.props._id, withinReview: false } })
    }
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
      selected,
      selectImage,
      selectionActionsAllowed,
      uri,
      uriIsLocal,
      transformation,
    } = this.props

    const WIDTH_OF_SELECTION = transformation.rightBoundary - transformation.leftBoundary
    const HEIGHT_OF_SELECTION = transformation.bottomBoundary - transformation.topBoundary
    const SCALE = WIDTH_OF_SELECTION / QUEUE_IMAGE_DIMENSION
    const WIDTH_OF_THUMBNAIL = Math.round(WIDTH_OF_SELECTION / SCALE) * 2
    const HEIGHT_OF_THUMBNAIL = Math.round(HEIGHT_OF_SELECTION / SCALE) * 2

    const imageSource = notUploadedYet || uriIsLocal ? uri :
      transformedImageURI({ cloudinaryID, transformation }, {
        thumbnail: true,
        thumbnailWidth: WIDTH_OF_THUMBNAIL,
        thumbnailHeight: HEIGHT_OF_THUMBNAIL,
      })

    const selectionIcon = selected ? 'ios-checkmark-circle-outline' : 'ios-radio-button-off'
    const selectionIconStyle = selected ? styles.iconSelected : styles.iconDeselected
    const selectionIconAction = selected ? deselectImage : selectImage

    const animatedImageStyle = {
      ...styles.animatedImageStyle,
      resizeMode: uriIsLocal ? 'cover' : 'contain',
    }

    const pixelScoreData = pixelScore(transformation)

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
                key={`queue-item-thumbnail-${imageSource}`}
                containerStyle={styles.animatedImageContainerStyle}
                imageStyle={animatedImageStyle}
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
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.pixelScoreTitle}>
                          {pixelScoreData.title}
                        </Text>
                        {pixelScoreData.value === 'LIMITED' &&
                          <Menu
                            renderer={renderers.Popover}
                            rendererProps={{
                              preferredPlacement: 'bottom',
                              anchorStyle: { backgroundColor: '#ddd' },
                            }}
                          >
                            <MenuTrigger>
                              <Icon
                                name='ios-information-circle-outline'
                                style={styles.iconPixelScoreLimited}
                              />
                            </MenuTrigger>
                            <MenuOptions>
                              <Text style={styles.pixelScoreLimitedText}>
                                This is a low resolution image.
                                Be aware that the image may appear pixelated when printed.
                                If the image is zoomed into a larger picture, try zooming out
                                to get more pixels in the selection. If you have received this
                                image from a friend via a messaging app like Whatsapp, you can ask
                                your friend to share the original resolution picture as a document
                                in the messaging app, or via email, or photo cloud service.
                              </Text>
                            </MenuOptions>
                          </Menu>
                        }
                      </View>
                      <Text style={material.caption}>
                        {pixelScoreData.width} x {pixelScoreData.height}
                      </Text>
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
  selected: PropTypes.bool.isRequired,
  selectionActionsAllowed: PropTypes.bool.isRequired,
  selectImage: PropTypes.func.isRequired,
  transformation: PropTypes.shape({
    topBoundary: PropTypes.number,
    rightBoundary: PropTypes.number,
    bottomBoundary: PropTypes.number,
    leftBoundary: PropTypes.number,
  }).isRequired,
  uri: PropTypes.string.isRequired,
  uriIsLocal: PropTypes.bool,
}

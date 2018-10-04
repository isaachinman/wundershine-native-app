import React from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { Col, Row } from 'react-native-easy-grid'
import FastImage from 'react-native-fast-image'
import isEqual from 'react-fast-compare'
import { ListItem } from 'react-native-ui-lib'
import { Icon } from 'components'
import { NavActions } from 'utils/nav'

import Interactable from 'react-native-interactable'

import { blackSecondary, blackTertiary, greyAccent, whitePrimary, whiteSecondary } from 'styles/colours'
import { pixelScore, transformedImageURI } from 'utils/images'
import { material, systemWeights } from 'react-native-typography'

import { TEXT_CONTAINER_MARGIN_RIGHT, QUEUE_ITEM_HEIGHT, QUEUE_ITEM_PADDING, QUEUE_IMAGE_DIMENSION, QUEUE_ICON_SIZE } from '../constants'

export const calculateThumbnail = ({ cloudinaryID, transformation }) => {
  const WIDTH_OF_SELECTION = transformation.rightBoundary - transformation.leftBoundary
  const HEIGHT_OF_SELECTION = transformation.bottomBoundary - transformation.topBoundary
  const SCALE = WIDTH_OF_SELECTION / QUEUE_IMAGE_DIMENSION
  const WIDTH_OF_THUMBNAIL = Math.round(WIDTH_OF_SELECTION / SCALE) * 2
  const HEIGHT_OF_THUMBNAIL = Math.round(HEIGHT_OF_SELECTION / SCALE) * 2

  return transformedImageURI({ cloudinaryID, transformation }, {
    thumbnail: true,
    thumbnailWidth: WIDTH_OF_THUMBNAIL,
    thumbnailHeight: HEIGHT_OF_THUMBNAIL,
  })
}

const styles = {
  container: {
    minHeight: QUEUE_ITEM_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'center',
  },
  titleContainer: {
    marginRight: TEXT_CONTAINER_MARGIN_RIGHT,
  },
  textContainer: {
    paddingLeft: QUEUE_ITEM_PADDING,
  },
  loadingImageOverlay: {
    width: QUEUE_IMAGE_DIMENSION,
    height: QUEUE_IMAGE_DIMENSION,
    position: 'absolute',
    left: QUEUE_ITEM_PADDING,
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    ...material.titleObject,
    ...systemWeights.regular,
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 5,
  },
  animatedImageContainerStyle: {
    width: QUEUE_IMAGE_DIMENSION,
    height: QUEUE_IMAGE_DIMENSION,
    marginLeft: QUEUE_ITEM_PADDING,
  },
  image: {
    height: QUEUE_IMAGE_DIMENSION,
  },
  iconSelected: {
    fontSize: QUEUE_ICON_SIZE,
    color: '#424242',
    paddingTop: QUEUE_ITEM_PADDING,
    paddingRight: QUEUE_ITEM_PADDING,
    paddingBottom: QUEUE_ITEM_PADDING,
    paddingLeft: QUEUE_ITEM_PADDING * 2,
    marginTop: -QUEUE_ITEM_PADDING,
  },
  iconDeselected: {
    fontSize: QUEUE_ICON_SIZE,
    color: '#E2E2E2',
    paddingTop: QUEUE_ITEM_PADDING,
    paddingRight: QUEUE_ITEM_PADDING,
    paddingBottom: QUEUE_ITEM_PADDING,
    paddingLeft: QUEUE_ITEM_PADDING * 2,
    marginTop: -QUEUE_ITEM_PADDING,
  },
  loadingIconContainer: {
    width: 65,
    height: 38,
    paddingTop: QUEUE_ITEM_PADDING + 8,
    paddingRight: QUEUE_ITEM_PADDING,
    paddingBottom: QUEUE_ITEM_PADDING,
    paddingLeft: QUEUE_ITEM_PADDING * 2,
    marginTop: -QUEUE_ITEM_PADDING,
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
    marginRight: QUEUE_ITEM_PADDING + 5,
    fontSize: 28,
    alignSelf: 'flex-end',
  },
  pixelScoreTitle: {
    ...material.captionObject,
    color: blackTertiary,
    fontSize: 14,
    lineHeight: 15 * 1.35,
  },
  iconPixelScoreLimited: {
    fontSize: 14,
    marginTop: 3,
    marginLeft: 3,
    color: blackSecondary,
  },
  pixelScoreLimitedText: {
    padding: 15,
  },
  localImageOverlayContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  localImageOverlay: {
    flex: 1,
  },
  thumbnailLoading: {
    position: 'absolute',
    backgroundColor: '#E2E2E2',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

export default class QueueItem extends React.Component {

  state = {
    thumbnailLoading: false,
    localImageOverlay: typeof this.props.localURI === 'string',
  }

  shouldComponentUpdate(nextProps, nextState) {
    const propsChanged = !isEqual(this.props, nextProps)
    const stateChanged = !isEqual(this.state, nextState)
    return propsChanged || stateChanged
  }

  onLoadStart = () => {
    this.setState({ thumbnailLoading: true })
  }

  onLoad = () => {
    this.setState({
      thumbnailLoading: false,
    })
  }

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

  displayDeselectionAlert = async () => {
    Alert.alert(
      'Deselecting images',
      'Only when you have more pictures in your queue than in the selected pack, can you deselect and reselect images for your pack.',
      [{ text: 'Close' }],
    )
  }

  displayLimitedPixelAlert = async () => {
    Alert.alert(
      'Limited resolution',
      'This is a low resolution image. Be aware that image may appear pixelated when printed. If the image is zoomed into a larger picture, try zooming out to get more pixels in the selection. If you have received this image from a friend via messaging app, you can ask your friend to share the original resolution picture as a document in the messaging app, or via email or photo cloud service.',
      [{ text: 'Close' }],
    )
  }

  render() {

    const {
      localImageOverlay,
      thumbnailLoading,
    } = this.state

    const {
      _id,
      deleteImage,
      deselectImage,
      cloudinaryID,
      loading,
      loadPriority,
      localURI,
      name,
      notUploadedYet,
      selected,
      selectImage,
      selectionActionsAllowed,
      uri,
      uriIsLocal,
      transformation,
    } = this.props

    const imageSource = notUploadedYet || uriIsLocal ? uri :
      calculateThumbnail({ cloudinaryID, transformation })

    const selectionIcon = selected ? 'check-circle' : 'radio-button-unchecked'
    const selectionIconStyle = selected ? styles.iconSelected : styles.iconDeselected
    const selectionIconAction = selected ? deselectImage : selectImage

    const resizeMode = uriIsLocal ? FastImage.resizeMode.cover : FastImage.resizeMode.contain

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
              <View style={styles.animatedImageContainerStyle}>
                {
                  /*
                    Manual fallback to <Image /> due to:
                    https://github.com/DylanVann/react-native-fast-image/issues/195
                  */
                }
                {uriIsLocal ?
                  <Image
                    source={{ uri: imageSource }}
                    style={styles.image}
                    resizeMode={resizeMode}
                    onLoadStart={this.onLoadStart}
                    onLoad={this.onLoad}
                  />
                  :
                  <FastImage
                    source={{
                      uri: imageSource,
                      priority: FastImage.priority[loadPriority >= 0 && loadPriority < 33 ? 'high' :
                        loadPriority >= 33 && loadPriority < 66 ? 'medium' :
                          'low'],
                    }}
                    style={styles.image}
                    resizeMode={resizeMode}
                    onLoadStart={this.onLoadStart}
                    onLoad={this.onLoad}
                  />
                }
                {thumbnailLoading &&
                  <View style={styles.thumbnailLoading}>
                    <ActivityIndicator color={whitePrimary} />
                  </View>
                }
                {localImageOverlay && localURI &&
                  <View style={styles.localImageOverlayContainer}>
                    <Image
                      source={{ uri: localURI }}
                      style={styles.localImageOverlay}
                    />
                  </View>
                }
              </View>
              {notUploadedYet &&
                <View style={styles.loadingImageOverlay}>
                  <ActivityIndicator color={whiteSecondary} />
                </View>
              }
            </ListItem.Part>
            <ListItem.Part middle column containerStyle={styles.textContainer}>
              <Row>
                <Col style={styles.titleContainer}>
                  <Text
                    style={styles.imageTitle}
                    numberOfLines={2}
                    ellipsizeMode='middle'
                    textBreakStrategy='simple'
                  >
                    {name}
                  </Text>
                  {notUploadedYet ?
                    <Text style={styles.pixelScoreTitle}>Importing...</Text>
                    :
                    <View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.pixelScoreTitle}>
                          {pixelScoreData.title}
                        </Text>
                        {pixelScoreData.value === 'LIMITED' &&
                          <TouchableOpacity
                            onPress={() => this.displayLimitedPixelAlert()}
                          >
                            <Icon
                              name='info'
                              style={styles.iconPixelScoreLimited}
                            />
                          </TouchableOpacity>
                        }
                      </View>
                      <Text style={styles.pixelScoreTitle}>
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
                      onPress={selectionActionsAllowed ?
                        () => selectionIconAction(_id) :
                        () => this.displayDeselectionAlert()}
                    >
                      <Icon name={selectionIcon} style={selectionIconStyle} />
                    </TouchableOpacity>
                  }
                  <TouchableOpacity
                    onPress={this.openSlideout}
                  >
                    <Icon name='more-horiz' style={styles.iconMore} />
                  </TouchableOpacity>
                </Col>
              </Row>
            </ListItem.Part>
          </ListItem>
        </Interactable.View>
        <View style={styles.slideoutContainer}>
          <TouchableOpacity onPress={() => this.handleSlideoutAction(this.redirectToEditScreen)}>
            <Icon name='crop-rotate' style={styles.iconSlideout} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.handleSlideoutAction(deleteImage.bind(null, _id))}>
            <Icon name='delete' style={styles.iconSlideout} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

QueueItem.defaultProps = {
  cloudinaryID: null,
  localURI: null,
  notUploadedYet: false,
  uriIsLocal: false,
}

QueueItem.propTypes = {
  _id: PropTypes.string.isRequired,
  cloudinaryID: PropTypes.string,
  deleteImage: PropTypes.func.isRequired,
  deselectImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadPriority: PropTypes.number.isRequired,
  localURI: PropTypes.string,
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

import React from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { AnimatedImage, ListItem } from 'react-native-ui-lib'
import { cloudinary } from 'utils/images'
import { Col, Row } from 'react-native-easy-grid'
import { Icon } from 'components'

import { blackSecondary, greyAccent, whiteSecondary } from 'styles/colours'
import { material } from 'react-native-typography'

import { QUEUE_ITEM_HEIGHT, QUEUE_IMAGE_DIMENSION } from '../constants'

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
    fontSize: 34,
    color: blackSecondary,
  },
  iconDeselected: {
    fontSize: 34,
    color: whiteSecondary,
  },
}

export default class QueueItem extends React.Component {

  render() {

    const {
      cloudinaryID,
      loading,
      name,
      notUploadedYet,
      origin,
      selected,
      selectionActionsAllowed,
      uri,
      uriIsLocal,
    } = this.props

    const imageSource = notUploadedYet || uriIsLocal ? uri :
      cloudinary.url(cloudinaryID, { width: 400, crop: 'scale' })

    const selectionIcon = selected ? 'ios-checkmark-circle-outline' : 'ios-radio-button-off'
    const selectionIconStyle = selected ? styles.iconSelected : styles.iconDeselected

    return (
      <ListItem
        activeBackgroundColor={greyAccent}
        height={100}
        onPress={() => { }}
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
            <Col>
              <Text style={styles.imageTitle}>{name}</Text>
            </Col>
            <Col style={{ flex: 0 }}>
              <TouchableOpacity
                disabled={!selectionActionsAllowed}
              >
                <Icon style={selectionIconStyle} name={selectionIcon} />
              </TouchableOpacity>
            </Col>
          </Row>
          {notUploadedYet ?
            <Text style={styles.importText}>Import in progress...</Text>
            :
            <View>
              <Text style={material.caption}>{origin || 'Unknown'}</Text>
              <Text onPress={() => this.props.deleteImage(this.props._id)}>{loading ? 'Loading' : 'Delete'}</Text>
              <Text onPress={() => this.props.selectImage(this.props._id)}>{loading ? 'Loading' : 'Select'}</Text>
            </View>
          }
        </ListItem.Part>
      </ListItem>
    )
  }
}

QueueItem.defaultProps = {
  cloudinaryID: null,
  notUploadedYet: false,
  origin: null,
  uriIsLocal: false,
}

QueueItem.propTypes = {
  _id: PropTypes.string.isRequired,
  cloudinaryID: PropTypes.string,
  deleteImage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  notUploadedYet: PropTypes.bool,
  origin: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  selectionActionsAllowed: PropTypes.bool.isRequired,
  selectImage: PropTypes.func.isRequired,
  uri: PropTypes.string.isRequired,
  uriIsLocal: PropTypes.bool,
}

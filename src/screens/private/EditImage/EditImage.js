import React from 'react'
import PropTypes from 'prop-types'

import { screenUtils } from 'utils/nav'

import { Image, PanResponder, View } from 'react-native'

// Layouts
const SQUARE = 'wundershine/SQUARE_LAYOUT'
const LANDSCAPE = 'wundershine/LANDSCAPE_LAYOUT'
const PORTRAIT = 'wundershine/PORTRAIT_LAYOUT'

const SQUARE_FRAME_DIMENSION = 300

const styles = {
  frame: {
    marginTop: 50,
    alignSelf: 'center',
    width: SQUARE_FRAME_DIMENSION,
    height: SQUARE_FRAME_DIMENSION,
    borderColor: 'black',
    borderWidth: 1,
    overflow: 'hidden',
  },
}

@screenUtils
export default class EditImage extends React.Component {

  static screenTitle = 'Edit image'

  componentWillMount = () => {

    const { width, height } = this.props
    this.aspectRatio = width / height

    if (this.aspectRatio < 1) {
      this.layout = PORTRAIT
    } else if (this.aspectRatio === 1) {
      this.layout = SQUARE
    } else if (this.aspectRatio > 1) {
      this.layout = LANDSCAPE
    }

    /* Landscape */
    if (this.layout === LANDSCAPE) {

      this.adjustedWidth = ((SQUARE_FRAME_DIMENSION / width) * width) * this.aspectRatio
      this.adjustedHeight = SQUARE_FRAME_DIMENSION

      this.topOffset = 0
      this.leftOffset = -((this.adjustedWidth - SQUARE_FRAME_DIMENSION) / 2)

      this.previousTop = 0
      this.previousLeft = this.leftOffset

    }

    this.imageStyles = {
      width: this.adjustedWidth,
      height: this.adjustedHeight,
      top: this.topOffset,
      left: this.leftOffset,
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    })

  }

  componentDidMount = () => this.updateNativeStyles()

  updateNativeStyles = () => this.image && this.image.setNativeProps(this.imageStyles)

  calculateLeft = (previousLeft, dx) => {
    let leftVal = previousLeft + dx

    // Left boundary
    if (leftVal >= 0) {
      leftVal = 0
    }

    // Right boundary
    if (leftVal <= this.leftOffset * 2) {
      leftVal = this.leftOffset * 2
    }

    return leftVal
  }

  calculateTop = (previousTop, dy) => {
    let topVal = previousTop + dy

    // Top boundary
    if (topVal >= 0) {
      topVal = 0
    }

    // Bottom boundary
    if (topVal <= this.topOffset * 2) {
      topVal = this.topOffset * 2
    }

    return topVal
  }

  handlePanResponderMove = (e, gestureState) => {
    this.imageStyles.left = this.calculateLeft(this.previousLeft, gestureState.dx)
    this.imageStyles.top = this.calculateTop(this.previousTop, gestureState.dy)
    this.updateNativeStyles()
  }

  handlePanResponderEnd = (e, gestureState) => {
    this.previousLeft = this.calculateLeft(this.previousLeft, gestureState.dx)
    this.previousTop = this.calculateTop(this.previousTop, gestureState.dy)
  }

  render() {

    return (
      <View style={styles.frame}>
        <Image
          {...this.panResponder.panHandlers}
          ref={i => this.image = i}
          source={{ uri: this.props.uri }}
          style={this.imageStyles}
        />
      </View>
    )
  }
}

EditImage.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  uri: PropTypes.string.isRequired,
}

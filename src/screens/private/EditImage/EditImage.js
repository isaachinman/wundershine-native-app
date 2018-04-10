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

    let adjustedWidth
    let adjustedHeight
    let leftOffset

    /* Landscape */
    if (this.layout === LANDSCAPE) {

      adjustedWidth = ((SQUARE_FRAME_DIMENSION / width) * width) * this.aspectRatio
      adjustedHeight = SQUARE_FRAME_DIMENSION
      leftOffset = -((adjustedWidth - SQUARE_FRAME_DIMENSION) / 2)

      this.imageStyles = {
        width: adjustedWidth,
        height: adjustedHeight,
        left: leftOffset,
      }

      this.previousTop = 0
      this.previousLeft = leftOffset

    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => this.setHighlight(true),
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd,
    })

  }

  componentDidMount = () => this.updateNativeStyles()

  setHighlight = (highlighted) => {
    this.imageStyles.opacity = highlighted ? 0.8 : 1
    this.updateNativeStyles()
  }

  updateNativeStyles = () => this.image && this.image.setNativeProps(this.imageStyles)

  calculateLeft = (previousLeft, dx) => {

    let leftVal = previousLeft
    console.log(typeof dx)
    if (typeof dx === 'number') {
      console.log('inside: ', previousLeft, dx)
      leftVal = previousLeft + dx
      if (leftVal >= 0) {
        leftVal = 0
      }
    }
    console.log(leftVal)
    return leftVal
  }

  handlePanResponderMove = (e, gestureState) => {
    this.imageStyles.left = this.calculateLeft(this.previousLeft + gestureState.dx)
    this.imageStyles.top = this.previousTop + gestureState.dy
    this.updateNativeStyles()
  }

  handlePanResponderEnd = (e, gestureState) => {
    this.previousLeft += gestureState.dx
    this.previousTop += gestureState.dy
    this.setHighlight(false)
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

import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { NavActions, screenUtils } from 'utils/nav'

import { Button } from 'components'
import { Image, View } from 'react-native'
import { createResponder } from 'react-native-gesture-responder'

import { SQUARE, PORTRAIT, LANDSCAPE } from 'utils/images/aspect-ratios'

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

@inject('queue')
@screenUtils
@observer
export default class EditImage extends React.Component {

  static screenTitle = 'Edit image'

  componentWillMount = () => {

    // Find master image from queue
    const { _id, queue } = this.props
    this.masterImage = queue.data.images.find(i => i._id === _id)

    // Determine aspect ratio and layout
    this.aspectRatio = this.masterImage.width / this.masterImage.height
    if (this.aspectRatio < 1) {
      this.layout = PORTRAIT
    } else if (this.aspectRatio === 1) {
      this.layout = SQUARE
    } else if (this.aspectRatio > 1) {
      this.layout = LANDSCAPE
    }

    // Apply initial transformation
    this.applyTransformation()

    this.gestureResponder = createResponder({
      onStartShouldSetResponder: () => true,
      onStartShouldSetResponderCapture: () => true,
      onMoveShouldSetResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onResponderMove: this.handleResponderMove,
      onResponderRelease: this.handleResponderEnd,
      onResponderTerminate: this.handleResponderEnd,
    })

  }

  componentDidMount = () => this.updateNativeStyles()

  applyTransformation = () => {

    const { transformation, width, height } = this.masterImage

    const widthOfSelection = transformation.rightBoundary - transformation.leftBoundary
    const heightOfSelection = transformation.bottomBoundary - transformation.topBoundary

    const widthScale = widthOfSelection / SQUARE_FRAME_DIMENSION
    const heightScale = heightOfSelection / SQUARE_FRAME_DIMENSION
    this.adjustedWidth = width / widthScale
    this.adjustedHeight = height / heightScale

    const { adjustedWidth, adjustedHeight } = this

    const leftBoundary = -(transformation.leftBoundary / width) * adjustedWidth
    const topBoundary = -(transformation.topBoundary / height) * adjustedHeight
    // Will need to add right and bottom boundaries to support zoom

    this.leftOffset = leftBoundary
    this.previousLeft = leftBoundary

    this.topOffset = topBoundary
    this.previousTop = topBoundary

    this.xShift = this.leftOffset
    this.yShift = this.topOffset

    this.rightLimit = this.leftOffset - ((adjustedWidth + this.leftOffset) - SQUARE_FRAME_DIMENSION)
    this.bottomLimit = this.topOffset - ((adjustedHeight + this.topOffset) - SQUARE_FRAME_DIMENSION)

    this.imageStyles = {
      width: this.adjustedWidth,
      height: this.adjustedHeight,
      top: this.topOffset,
      left: this.leftOffset,
    }

  }

  saveTransformation = async () => {
    const { adjustedWidth, adjustedHeight } = this
    const { _id, queue } = this.props
    const { width, height } = this.masterImage
    const xShift = Math.abs(this.xShift)
    const yShift = Math.abs(this.yShift)

    const leftBoundary = (xShift / adjustedWidth) * width
    const rightBoundary = ((xShift + SQUARE_FRAME_DIMENSION) / adjustedWidth) * width

    const topBoundary = (yShift / adjustedHeight) * height
    const bottomBoundary = ((yShift + SQUARE_FRAME_DIMENSION) / adjustedHeight) * height

    try {
      await queue.updateImageTransformation(_id, {
        topBoundary: Math.round(topBoundary),
        rightBoundary: Math.round(rightBoundary),
        bottomBoundary: Math.round(bottomBoundary),
        leftBoundary: Math.round(leftBoundary),
      })
      NavActions.push({ screen: 'ImageQueue' })
    } catch (error) {
      // Handle error
    }

  }

  updateNativeStyles = () => {
    if (this.image) {
      this.image.setNativeProps({
        ...this.imageStyles,
        top: this.yShift,
        left: this.xShift,
      })
    }
  }

  calculateXAxis = (previousLeft, dx) => {
    let leftVal = previousLeft + dx
    // Left boundary
    if (leftVal >= 0) {
      leftVal = 0
    }
    // Right boundary
    if (leftVal <= this.rightLimit) {
      leftVal = this.rightLimit
    }

    if (this.verticalLetterboxMargin) {
      leftVal = this.verticalLetterboxMargin
    }

    return leftVal
  }

  calculateYAxis = (previousTop, dy) => {
    let topVal = previousTop + dy
    // Top boundary
    if (topVal >= 0) {
      topVal = 0
    }
    // Bottom boundary
    if (topVal <= this.bottomLimit) {
      topVal = this.bottomLimit
    }

    if (this.verticalLetterboxMargin) {
      if (this.imageStyles.height <= SQUARE_FRAME_DIMENSION) {
        topVal = 0
      }
      if (topVal >= 0) {
        topVal = 0
      }
    }

    return topVal
  }

  calculateZoom = (gestureState) => {
    const zoomFactor = gestureState.pinch - gestureState.previousPinch

    const ratio = (this.imageStyles.width + zoomFactor) / this.imageStyles.width

    const oldWidth = this.imageStyles.width
    const oldHeight = this.imageStyles.height

    const newWidth = this.imageStyles.width + zoomFactor
    const newHeight = this.imageStyles.height * ratio

    let xShift = this.xShift - ((newWidth - oldWidth) / 2)
    let yShift = this.yShift - ((newHeight - oldHeight) / 2)

    this.verticalLetterboxMargin = null
    this.horizontalLetterboxMargin = null

    // Portrait limit
    if (newWidth < SQUARE_FRAME_DIMENSION) {
      this.verticalLetterboxMargin = (SQUARE_FRAME_DIMENSION - newWidth) / 2
      xShift = this.verticalLetterboxMargin
      if (newHeight <= SQUARE_FRAME_DIMENSION) {
        return false
      }
      if (yShift >= 0) {
        yShift = 0
      }
    }

    this.imageStyles.width = newWidth
    this.imageStyles.height = newHeight

    this.xShift = xShift
    this.yShift = yShift

    return true

  }

  handleResponderMove = (e, gestureState) => {
    if (gestureState.pinch) {
      this.calculateZoom(gestureState)
    } else {
      this.xShift = this.calculateXAxis(this.previousLeft, gestureState.dx)
      this.yShift = this.calculateYAxis(this.previousTop, gestureState.dy)
    }
    this.updateNativeStyles()
  }

  handleResponderEnd = (e, gestureState) => {
    this.previousLeft = this.calculateXAxis(this.previousLeft, gestureState.dx)
    this.previousTop = this.calculateYAxis(this.previousTop, gestureState.dy)
  }

  render() {

    return (
      <View>
        <View style={styles.frame}>
          <Image
            {...this.gestureResponder}
            ref={i => this.image = i}
            source={{ uri: this.masterImage.uri }}
            style={this.imageStyles}
          />
        </View>
        <Button
          text='Save'
          onPress={this.saveTransformation}
          block
          bordered
          primary
        />
      </View>
    )
  }
}

EditImage.wrappedComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  queue: PropTypes.shape({
    updateImageTransformation: PropTypes.func,
  }).isRequired,
}

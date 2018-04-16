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
      moveThreshold: 10,
      minMoveDistance: 10,
    })

  }

  componentDidMount = () => this.updateNativeStyles()

  applyTransformation = () => {

    const { transformation, width, height } = this.masterImage

    const {
      topBoundary,
      rightBoundary,
      bottomBoundary,
      leftBoundary,
    } = transformation

    const widthOfSelection = rightBoundary - leftBoundary
    const heightOfSelection = bottomBoundary - topBoundary
    const aspectRatioOfSelection = widthOfSelection / heightOfSelection

    let adjustedWidth
    let adjustedHeight

    let topOffset
    let leftOffset

    if (aspectRatioOfSelection < 1 && widthOfSelection === width) {

      const heightInFrame = height - (height - (bottomBoundary - topBoundary))
      const heightScale = heightInFrame / SQUARE_FRAME_DIMENSION
      adjustedWidth = width / heightScale
      adjustedHeight = height / heightScale
      topOffset = -(topBoundary / heightScale)
      leftOffset = (SQUARE_FRAME_DIMENSION - adjustedWidth) / 2

    } else if (aspectRatioOfSelection === 1) {

      const widthScale = widthOfSelection / SQUARE_FRAME_DIMENSION
      const heightScale = heightOfSelection / SQUARE_FRAME_DIMENSION
      adjustedWidth = width / widthScale
      adjustedHeight = height / heightScale
      leftOffset = -(transformation.leftBoundary / width) * adjustedWidth
      topOffset = -(transformation.topBoundary / height) * adjustedHeight

    } else if (aspectRatioOfSelection > 1 && heightOfSelection === height) {

      const widthInFrame = width - (width - (rightBoundary - leftBoundary))
      const widthScale = widthInFrame / SQUARE_FRAME_DIMENSION
      adjustedWidth = width / widthScale
      adjustedHeight = height / widthScale
      leftOffset = -(leftBoundary / widthScale)
      topOffset = (SQUARE_FRAME_DIMENSION - adjustedHeight) / 2

    }

    this.leftOffset = leftOffset
    this.previousLeft = leftOffset

    this.topOffset = topOffset
    this.previousTop = topOffset

    this.xShift = this.leftOffset
    this.yShift = this.topOffset

    this.rightLimit = this.leftOffset - ((adjustedWidth + this.leftOffset) - SQUARE_FRAME_DIMENSION)
    this.bottomLimit = this.topOffset - ((adjustedHeight + this.topOffset) - SQUARE_FRAME_DIMENSION)

    this.imageStyles = {
      width: adjustedWidth,
      height: adjustedHeight,
      top: this.topOffset,
      left: this.leftOffset,
    }

  }

  saveTransformation = async () => {

    const { _id, queue } = this.props
    const { width, height } = this.masterImage
    const xShift = Math.abs(this.xShift)
    const yShift = Math.abs(this.yShift)

    let topBoundary
    let rightBoundary
    let bottomBoundary
    let leftBoundary

    // Square selection
    if (this.imageStyles.width >= SQUARE_FRAME_DIMENSION &&
      this.imageStyles.height >= SQUARE_FRAME_DIMENSION) {

      topBoundary = (yShift / this.imageStyles.height) * height
      bottomBoundary = ((yShift + SQUARE_FRAME_DIMENSION) / this.imageStyles.height) * height

      leftBoundary = (xShift / this.imageStyles.width) * width
      rightBoundary = ((xShift + SQUARE_FRAME_DIMENSION) / this.imageStyles.width) * width

    }

    // Portrait letterbox
    if (this.imageStyles.width < SQUARE_FRAME_DIMENSION) {
      topBoundary = (yShift / this.imageStyles.height) * height
      rightBoundary = width
      bottomBoundary = ((yShift + SQUARE_FRAME_DIMENSION) / this.imageStyles.height) * height
      leftBoundary = 0
    }

    // Landscape letterbox
    if (this.imageStyles.height < SQUARE_FRAME_DIMENSION) {
      topBoundary = 0
      rightBoundary = ((xShift + SQUARE_FRAME_DIMENSION) / this.imageStyles.width) * width
      bottomBoundary = height
      leftBoundary = (xShift / this.imageStyles.width) * width
    }


    // // if (this.imageStyles.height < SQUARE_FRAME_DIMENSION) {
    // //   rightBoundary = ((xShift + SQUARE_FRAME_DIMENSION) / adjustedWidth) * width
    // // }

    // console.log('current width: ', this.imageStyles.width)
    // console.log('current height: ', this.imageStyles.height)
    // console.log('xShift: ', this.xShift)
    // console.log('yShift: ', this.yShift)

    // console.log('topBoundary: ', topBoundary)
    // console.log('rightBoundary: ', rightBoundary)
    // console.log('bottomBoundary: ', bottomBoundary)
    // console.log('leftBoundary: ', leftBoundary)

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

    if (this.imageStyles.width < SQUARE_FRAME_DIMENSION) {
      leftVal = this.xShift
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

    if (this.imageStyles.height < SQUARE_FRAME_DIMENSION) {
      topVal = this.yShift
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

    // Portrait limit
    if (this.layout === PORTRAIT && newWidth < SQUARE_FRAME_DIMENSION) {
      xShift = (SQUARE_FRAME_DIMENSION - newWidth) / 2
      if (newHeight <= SQUARE_FRAME_DIMENSION) {
        return false
      }
      if (yShift >= 0) {
        yShift = 0
      }
      if (yShift + newHeight <= SQUARE_FRAME_DIMENSION) {
        yShift = 0
      }
    }

    // Landscape limit
    if (this.layout === LANDSCAPE && newHeight < SQUARE_FRAME_DIMENSION) {
      yShift = (SQUARE_FRAME_DIMENSION - newHeight) / 2
      if (newWidth <= SQUARE_FRAME_DIMENSION) {
        return false
      }
      if (xShift >= 0) {
        xShift = 0
      }
      if (xShift + newWidth <= SQUARE_FRAME_DIMENSION) {
        xShift = 0
      }
    }

    this.rightLimit = this.leftOffset - ((newWidth + this.leftOffset) - SQUARE_FRAME_DIMENSION)
    this.bottomLimit = this.topOffset - ((newHeight + this.topOffset) - SQUARE_FRAME_DIMENSION)

    this.imageStyles.width = newWidth
    this.imageStyles.height = newHeight

    this.xShift = xShift
    this.yShift = yShift
    this.previousLeft = xShift
    this.previousTop = yShift

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
          style={{ marginTop: 20 }}
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

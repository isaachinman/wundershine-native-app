import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { NavActions, screenUtils } from 'utils/nav'

import { Image, View } from 'react-native'
import { createResponder } from 'react-native-gesture-responder'

import { roundBoundaries } from 'utils/images'
import { SQUARE, PORTRAIT, LANDSCAPE } from 'utils/images/aspect-ratios'
import { SQUARE_FRAME_DIMENSION } from './constants'
import styles from './EditImage.styles'

@inject('queue')
@screenUtils
@observer
export default class EditImage extends React.Component {

  static screenTitle = 'Edit image'

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'save',
        title: 'Save',
      },
    ],
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  componentWillMount = () => {

    // Find master image from queue
    const { _id, queue } = this.props
    this.masterImage = queue.data.images.find(i => i._id === _id)

    // Determine aspect ratio and set layout
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

    // Create gesture responder
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

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'save') {
        this.saveTransformation()
      }
    }
  }

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

    let yShift
    let xShift

    if (aspectRatioOfSelection < 1 && widthOfSelection === width) {

      // Portrait selection
      const heightInFrame = height - (height - (bottomBoundary - topBoundary))
      const heightScale = heightInFrame / SQUARE_FRAME_DIMENSION
      adjustedWidth = width / heightScale
      adjustedHeight = height / heightScale
      yShift = -(topBoundary / heightScale)
      xShift = (SQUARE_FRAME_DIMENSION - adjustedWidth) / 2

    } else if (aspectRatioOfSelection === 1) {

      // Square selection
      const widthScale = widthOfSelection / SQUARE_FRAME_DIMENSION
      const heightScale = heightOfSelection / SQUARE_FRAME_DIMENSION
      adjustedWidth = width / widthScale
      adjustedHeight = height / heightScale
      yShift = -(transformation.topBoundary / height) * adjustedHeight
      xShift = -(transformation.leftBoundary / width) * adjustedWidth

    } else if (aspectRatioOfSelection > 1 && heightOfSelection === height) {

      // Landscape selection
      const widthInFrame = width - (width - (rightBoundary - leftBoundary))
      const widthScale = widthInFrame / SQUARE_FRAME_DIMENSION
      adjustedWidth = width / widthScale
      adjustedHeight = height / widthScale
      yShift = (SQUARE_FRAME_DIMENSION - adjustedHeight) / 2
      xShift = -(leftBoundary / widthScale)

    }

    this.previousLeft = xShift
    this.previousTop = yShift

    this.xShift = xShift
    this.yShift = yShift

    this.rightLimit = xShift - ((adjustedWidth + xShift) - SQUARE_FRAME_DIMENSION)
    this.bottomLimit = yShift - ((adjustedHeight + yShift) - SQUARE_FRAME_DIMENSION)

    this.imageStyles = {
      width: adjustedWidth,
      height: adjustedHeight,
      top: yShift,
      left: xShift,
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

    // Round boundaries
    const boundaries = roundBoundaries({
      topBoundary, rightBoundary, bottomBoundary, leftBoundary,
    })

    try {
      await queue.updateImageTransformation(_id, boundaries)
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

    // Portrait limits
    if (this.layout === PORTRAIT && newWidth < SQUARE_FRAME_DIMENSION) {
      xShift = (SQUARE_FRAME_DIMENSION - newWidth) / 2
      if (newHeight <= SQUARE_FRAME_DIMENSION) {
        return false
      }
      if (yShift >= 0) {
        yShift = 0
      }
      if (yShift + newHeight <= SQUARE_FRAME_DIMENSION) {
        yShift = -(newHeight - SQUARE_FRAME_DIMENSION)
      }
    } else if (this.layout === PORTRAIT && newWidth > SQUARE_FRAME_DIMENSION) {

      // If zooming out exposes margin on bottom
      if (xShift + newWidth < SQUARE_FRAME_DIMENSION) {
        xShift = -(newWidth - SQUARE_FRAME_DIMENSION)
      }
      if (yShift + newHeight < SQUARE_FRAME_DIMENSION) {
        yShift = -(newHeight - SQUARE_FRAME_DIMENSION)
      }

      // If zooming out exposes margin on top
      if (newWidth > SQUARE_FRAME_DIMENSION && xShift > 0) {
        xShift = 0
      }
      if (newHeight > SQUARE_FRAME_DIMENSION && yShift > 0) {
        yShift = 0
      }

    }

    // Landscape limits
    if (this.layout === LANDSCAPE && newHeight < SQUARE_FRAME_DIMENSION) {
      yShift = (SQUARE_FRAME_DIMENSION - newHeight) / 2
      if (newWidth <= SQUARE_FRAME_DIMENSION) {
        return false
      }
      if (xShift >= 0) {
        xShift = 0
      }
      if (xShift + newWidth <= SQUARE_FRAME_DIMENSION) {
        xShift = -(newWidth - SQUARE_FRAME_DIMENSION)
      }
    } else if (this.layout === LANDSCAPE && newHeight > SQUARE_FRAME_DIMENSION) {

      // If zooming out exposes margin on bottom
      if ((newHeight + yShift) < SQUARE_FRAME_DIMENSION) {
        yShift = -(newHeight - SQUARE_FRAME_DIMENSION)
      }
      if ((newWidth + xShift) < SQUARE_FRAME_DIMENSION) {
        xShift = -(newWidth - SQUARE_FRAME_DIMENSION)
      }

      // If zooming out exposes margin on top
      if (newHeight > SQUARE_FRAME_DIMENSION && yShift > 0) {
        yShift = 0
      }
      if (newWidth > SQUARE_FRAME_DIMENSION && xShift > 0) {
        xShift = 0
      }

    }

    // Square limits
    if (this.layout === SQUARE && newWidth <= SQUARE_FRAME_DIMENSION) {
      return false
    }
    if (this.layout === SQUARE &&
      newHeight > SQUARE_FRAME_DIMENSION && newWidth > SQUARE_FRAME_DIMENSION) {

      // If zooming out exposes margin on bottom
      if ((newHeight + yShift) < SQUARE_FRAME_DIMENSION) {
        yShift = -(newHeight - SQUARE_FRAME_DIMENSION)
      }
      if ((newWidth + xShift) < SQUARE_FRAME_DIMENSION) {
        xShift = -(newWidth - SQUARE_FRAME_DIMENSION)
      }

      // If zooming out exposes margin on top
      if (newHeight > SQUARE_FRAME_DIMENSION && yShift > 0) {
        yShift = 0
      }
      if (newWidth > SQUARE_FRAME_DIMENSION && xShift > 0) {
        xShift = 0
      }

    }

    // Calculate new panning limits
    this.rightLimit = this.xShift - ((newWidth + this.xShift) - SQUARE_FRAME_DIMENSION)
    this.bottomLimit = this.yShift - ((newHeight + this.yShift) - SQUARE_FRAME_DIMENSION)

    // Set new image dimensions
    this.imageStyles.width = newWidth
    this.imageStyles.height = newHeight

    // Set new image offsets
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

  handleResponderEnd = () => {
    this.previousLeft = this.xShift
    this.previousTop = this.yShift
  }

  render() {

    return (
      <View style={styles.content}>
        <View style={styles.paper}>
          <View style={styles.print}>
            <Image
              {...this.gestureResponder}
              ref={i => this.image = i}
              source={{ uri: this.masterImage.uri }}
              style={this.imageStyles}
            />
          </View>
        </View>
      </View>
    )
  }
}

EditImage.wrappedComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  navigator: PropTypes.shape({
    setOnNavigatorEvent: PropTypes.func.isRequired,
  }).isRequired,
  queue: PropTypes.shape({
    updateImageTransformation: PropTypes.func,
  }).isRequired,
}

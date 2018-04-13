import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { NavActions, screenUtils } from 'utils/nav'

import { Button } from 'components'
import { Image, PanResponder, View } from 'react-native'

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

    const { _id, queue } = this.props

    this.masterImage = queue.data.images.find(i => i._id === _id)

    this.applyTransformation()

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
    return topVal
  }

  handlePanResponderMove = (e, gestureState) => {
    this.xShift = this.calculateXAxis(this.previousLeft, gestureState.dx)
    this.yShift = this.calculateYAxis(this.previousTop, gestureState.dy)
    this.imageStyles.top = this.calculateYAxis(this.previousTop, gestureState.dy)
    this.updateNativeStyles()
  }

  handlePanResponderEnd = (e, gestureState) => {
    this.previousLeft = this.calculateXAxis(this.previousLeft, gestureState.dx)
    this.previousTop = this.calculateYAxis(this.previousTop, gestureState.dy)
  }

  render() {

    return (
      <View>
        <View style={styles.frame}>
          <Image
            {...this.panResponder.panHandlers}
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

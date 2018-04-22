import { SQUARE, PORTRAIT, LANDSCAPE } from 'utils/images/aspect-ratios'
import { SQUARE_FRAME_DIMENSION } from '../constants'

export default function (transformation) {

  this.transformation = transformation
  this.rotation = transformation.rotation

  let { width, height } = this.masterImage

  if (this.rotation % 180) {
    width = this.masterImage.height
    height = this.masterImage.width
  }

  // Determine aspect ratio and set layout
  this.aspectRatio = width / height
  if (this.aspectRatio < 1) {
    this.layout = PORTRAIT
  } else if (this.aspectRatio === 1) {
    this.layout = SQUARE
  } else if (this.aspectRatio > 1) {
    this.layout = LANDSCAPE
  }

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

  const transform = [
    { rotate: `${this.rotation}deg` },
  ]

  /*
    RN rotates around centre point, so we need to
    manually offset the rotation to stick the image
    to the top left corner so that our offsets will
    work.
  */
  if (this.rotation === 90) {
    transform.push(
      { translateX: -((adjustedWidth - adjustedHeight) / 2) },
      { translateY: -((adjustedWidth - adjustedHeight) / 2) },
    )
  } else if (this.rotation === 270) {
    transform.push(
      { translateX: ((adjustedWidth - adjustedHeight) / 2) },
      { translateY: ((adjustedWidth - adjustedHeight) / 2) },
    )
  }

  this.imageStyles = {
    width: this.rotation % 180 ? adjustedHeight : adjustedWidth,
    height: this.rotation % 180 ? adjustedWidth : adjustedHeight,
    top: yShift,
    left: xShift,
    transform,
  }

}

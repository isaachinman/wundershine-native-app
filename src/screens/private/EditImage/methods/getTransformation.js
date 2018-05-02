import { roundBoundaries } from 'utils/images'
import { SQUARE_FRAME_DIMENSION } from '../constants'

export default function () {

  let { width, height } = this.masterImage
  if (this.rotation % 180) {
    width = this.masterImage.height
    height = this.masterImage.width
  }

  // const xShift = this.rotation % 180 ? Math.abs(this.yShift) : Math.abs(this.xShift)
  // const yShift = this.rotation % 180 ? Math.abs(this.xShift) : Math.abs(this.yShift)
  const xShift = Math.abs(this.xShift)
  const yShift = Math.abs(this.yShift)

  let currentWidth = this.imageStyles.width
  let currentHeight = this.imageStyles.height
  if (this.rotation % 180) {
    currentWidth = this.imageStyles.height
    currentHeight = this.imageStyles.width
  }

  let topBoundary
  let rightBoundary
  let bottomBoundary
  let leftBoundary

  // Square selection
  if (currentWidth >= SQUARE_FRAME_DIMENSION &&
    currentHeight >= SQUARE_FRAME_DIMENSION) {

    topBoundary = (yShift / currentHeight) * height
    bottomBoundary = ((yShift + SQUARE_FRAME_DIMENSION) / currentHeight) * height

    leftBoundary = (xShift / currentWidth) * width
    rightBoundary = ((xShift + SQUARE_FRAME_DIMENSION) / currentWidth) * width

  }

  // Portrait letterbox
  if (currentWidth < SQUARE_FRAME_DIMENSION) {

    topBoundary = (yShift / currentHeight) * height
    rightBoundary = width
    bottomBoundary = ((yShift + SQUARE_FRAME_DIMENSION) / currentHeight) * height
    leftBoundary = 0
  }

  // Landscape letterbox
  if (currentHeight < SQUARE_FRAME_DIMENSION) {

    topBoundary = 0
    rightBoundary = ((xShift + SQUARE_FRAME_DIMENSION) / currentWidth) * width
    bottomBoundary = height
    leftBoundary = (xShift / currentWidth) * width
  }

  // Round boundaries
  return roundBoundaries({
    topBoundary, rightBoundary, bottomBoundary, leftBoundary,
  })

}

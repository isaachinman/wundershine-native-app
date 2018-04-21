import { roundBoundaries } from 'utils/images'
import { SQUARE_FRAME_DIMENSION } from '../constants'

export default function () {

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
  return roundBoundaries({
    topBoundary, rightBoundary, bottomBoundary, leftBoundary,
  })

}

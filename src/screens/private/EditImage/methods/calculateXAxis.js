import { SQUARE_FRAME_DIMENSION } from '../constants'

export default function (previousLeft, dx) {

  let leftVal = previousLeft + dx

  let { width } = this.imageStyles
  if (this.rotation % 180) {
    width = this.imageStyles.height
  }

  // Left boundary
  if (leftVal >= 0) {
    leftVal = 0
  }

  // Right boundary
  if (leftVal <= this.rightLimit) {
    leftVal = this.rightLimit
  }

  if (width < SQUARE_FRAME_DIMENSION) {
    leftVal = this.xShift
  }

  return leftVal

}

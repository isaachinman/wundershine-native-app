import { SQUARE_FRAME_DIMENSION } from '../constants'

export default function (previousTop, dy) {

  let { height } = this.imageStyles
  if (this.rotation % 180) {
    height = this.imageStyles.width
  }

  let topVal = previousTop + dy

  // Top boundary
  if (topVal >= 0) {
    topVal = 0
  }
  // Bottom boundary
  if (topVal <= this.bottomLimit) {
    topVal = this.bottomLimit
  }

  if (height < SQUARE_FRAME_DIMENSION) {
    topVal = this.yShift
  }

  return topVal

}

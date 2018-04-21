import { SQUARE_FRAME_DIMENSION } from '../constants'

export default function (previousTop, dy) {

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

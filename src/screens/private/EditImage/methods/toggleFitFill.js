import { fillTransformation, fitTransformation } from 'utils/images/transformation-defaults'
import { PORTRAIT, LANDSCAPE } from 'utils/images/aspect-ratios'

import { SQUARE_FRAME_DIMENSION } from '../constants'

export default function () {

  let newBoundaries = this.transformation
  const image = {
    ...this.masterImage,
    transformation: this.transformation,
  }
  let { width, height } = this.imageStyles
  if (this.transformation.rotation % 180) {
    width = this.imageStyles.height
    height = this.imageStyles.width
  }
  if (this.layout === PORTRAIT) {
    if (width < SQUARE_FRAME_DIMENSION) {
      newBoundaries = fillTransformation(image)
    } else {
      newBoundaries = fitTransformation(image)
    }
  } else if (this.layout === LANDSCAPE) {
    if (height < SQUARE_FRAME_DIMENSION) {
      newBoundaries = fillTransformation(image)
    } else {
      newBoundaries = fitTransformation(image)
    }
  }

  this.applyTransformation({ ...newBoundaries, rotation: this.rotation })
  this.updateNativeStyles()

}

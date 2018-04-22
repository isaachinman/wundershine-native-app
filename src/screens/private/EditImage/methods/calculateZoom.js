import { SQUARE, PORTRAIT, LANDSCAPE } from 'utils/images/aspect-ratios'
import { SQUARE_FRAME_DIMENSION } from '../constants'

export default function (gestureState) {

  const zoomFactor = (gestureState.pinch - gestureState.previousPinch) * 2

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

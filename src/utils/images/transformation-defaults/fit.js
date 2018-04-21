import { roundBoundaries } from 'utils/images'

export default (image) => {

  let { width, height } = image
  if (image.transformation.rotation % 180) {
    width = image.height
    height = image.width
  }

  const topBoundary = 0
  const rightBoundary = width
  const bottomBoundary = height
  const leftBoundary = 0

  // Round boundaries
  const boundaries = roundBoundaries({
    topBoundary, rightBoundary, bottomBoundary, leftBoundary,
  })

  return boundaries

}

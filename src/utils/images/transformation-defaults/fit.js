import { roundBoundaries } from 'utils/images'

export default (image) => {

  const { width, height } = image

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

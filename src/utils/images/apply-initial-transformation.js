import { roundBoundaries } from 'utils/images'

export default (image) => {


  let topBoundary = null
  let rightBoundary = null
  let bottomBoundary = null
  let leftBoundary = null


  const { width, height } = image
  const aspectRatio = width / height

  if (aspectRatio < 1) {

    // PORTRAIT
    leftBoundary = 0
    rightBoundary = width
    topBoundary = (height / 2) - (width / 2)
    bottomBoundary = (height / 2) + (width / 2)

  } else if (aspectRatio === 1) {

    // SQUARE
    leftBoundary = 0
    rightBoundary = width
    topBoundary = 0
    bottomBoundary = height

  } else if (aspectRatio > 1) {

    // LANDSCAPE
    topBoundary = 0
    bottomBoundary = height
    leftBoundary = (width / 2) - (height / 2)
    rightBoundary = (width / 2) + (height / 2)

  }

  // Round boundaries
  const boundaries = roundBoundaries({
    topBoundary, rightBoundary, bottomBoundary, leftBoundary,
  })

  return {
    ...image,
    transformation: boundaries,
  }
}

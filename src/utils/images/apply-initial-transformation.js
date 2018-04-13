export default (image) => {

  const transformation = {
    topBoundary: null,
    rightBoundary: null,
    bottomBoundary: null,
    leftBoundary: null,
  }

  const { width, height } = image
  const aspectRatio = width / height

  if (aspectRatio < 1) {
    // PORTRAIT
    transformation.leftBoundary = 0
    transformation.rightBoundary = width
    transformation.topBoundary = (height / 2) - (width / 2)
    transformation.bottomBoundary = (height / 2) + (width / 2)
  } else if (aspectRatio === 1) {
    // SQUARE
  } else if (aspectRatio > 1) {
    // LANDSCAPE
    transformation.topBoundary = 0
    transformation.bottomBoundary = height
    transformation.leftBoundary = (width / 2) - (height / 2)
    transformation.rightBoundary = (width / 2) + (height / 2)
  }

  // Round pixels
  Object.keys(transformation).forEach((boundary) => {
    transformation[boundary] = Math.round(transformation[boundary])
  })

  return {
    ...image,
    transformation,
  }
}

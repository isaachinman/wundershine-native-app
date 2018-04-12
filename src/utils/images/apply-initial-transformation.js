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
  } else if (aspectRatio === 1) {
    // SQUARE
  } else if (aspectRatio > 1) {
    // LANDSCAPE
    transformation.topBoundary = 0
    transformation.bottomBoundary = height
    transformation.leftBoundary = (width / 2) - (height / 2)
    transformation.rightBoundary = (width / 2) + (height / 2)
  }

  return {
    ...image,
    transformation,
  }
}

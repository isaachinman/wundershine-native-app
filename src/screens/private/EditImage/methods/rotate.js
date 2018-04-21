export default function (transformation, degreesToRotate) {

  let rotationValue = this.rotation + degreesToRotate
  if (rotationValue === 360) {
    rotationValue = 0
  } else if (rotationValue < 0) {
    rotationValue = 360 - Math.abs(rotationValue)
  }

  const {
    topBoundary,
    rightBoundary,
    bottomBoundary,
    leftBoundary,
  } = transformation

  let { width, height } = this.masterImage
  if (rotationValue % 180) {
    width = this.masterImage.height
    height = this.masterImage.width
  }

  let newTopBoundary
  let newRightBoundary
  let newBottomBoundary
  let newLeftBoundary

  if (degreesToRotate === 90) {
    newTopBoundary = leftBoundary
    newRightBoundary = width - topBoundary
    newBottomBoundary = height - (height - rightBoundary)
    newLeftBoundary = width - bottomBoundary
  } else if (degreesToRotate === -90) {
    newTopBoundary = height - rightBoundary
    newRightBoundary = bottomBoundary
    newBottomBoundary = height - leftBoundary
    newLeftBoundary = topBoundary
  }

  return {
    topBoundary: newTopBoundary,
    rightBoundary: newRightBoundary,
    bottomBoundary: newBottomBoundary,
    leftBoundary: newLeftBoundary,
    rotation: rotationValue,
  }
}

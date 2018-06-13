
const PIXEL_SCORES = {
  PLENTY: {
    min: 2000,
    max: Infinity,
    title: 'Plenty of pixels',
    value: 'PLENTY',
  },
  SUFFICIENT: {
    min: 1000,
    max: 1999,
    title: 'Sufficient pixels',
    value: 'SUFFICIENT',
  },
  LIMITED: {
    min: -Infinity,
    max: 999,
    title: 'Limited pixels',
    value: 'LIMITED',
  },
}

export default (transformation) => {

  const {
    topBoundary,
    rightBoundary,
    bottomBoundary,
    leftBoundary,
  } = transformation

  const width = rightBoundary - leftBoundary
  const height = bottomBoundary - topBoundary

  const largestDimension = Math.max(width, height)

  return {
    width,
    height,
    ...Object.values(PIXEL_SCORES).find(scoreRange =>
      largestDimension > scoreRange.min && largestDimension <= scoreRange.max),
  }

}

export default (boundaries) => {

  const {
    topBoundary,
    rightBoundary,
    bottomBoundary,
    leftBoundary,
  } = boundaries

  const widthOfSelection = Math.round(rightBoundary - leftBoundary)
  const heightOfSelection = Math.round(bottomBoundary - topBoundary)

  const leftBoundaryRounded = Math.round(leftBoundary)
  const rightBoundaryRounded = leftBoundaryRounded + widthOfSelection
  const topBoundaryRounded = Math.round(topBoundary)
  const bottomBoundaryRounded = topBoundaryRounded + heightOfSelection

  return {
    topBoundary: topBoundaryRounded,
    rightBoundary: rightBoundaryRounded,
    bottomBoundary: bottomBoundaryRounded,
    leftBoundary: leftBoundaryRounded,
  }

}

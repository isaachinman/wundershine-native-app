/*

  The purpose of this util is to generate all possible
  URIs for a new image transformation to facilitate
  prefetching.

*/

import { transformedImageURI } from 'utils/images'

import { SQUARE_REVIEW_PRINT_DIMENSION } from 'screens/private/PackReview/constants'


export default (image) => {

  const { transformation, uri } = image
  const fullSizeURI = uri

  /* PackReview thumbnails */
  const WIDTH_OF_SELECTION = transformation.rightBoundary - transformation.leftBoundary
  const HEIGHT_OF_SELECTION = transformation.bottomBoundary - transformation.topBoundary
  const SCALE = WIDTH_OF_SELECTION / SQUARE_REVIEW_PRINT_DIMENSION
  const WIDTH_OF_THUMBNAIL = Math.round(WIDTH_OF_SELECTION / SCALE) * 2
  const HEIGHT_OF_THUMBNAIL = Math.round(HEIGHT_OF_SELECTION / SCALE) * 2
  const packReviewURI = transformedImageURI(image, {
    thumbnail: true,
    thumbnailWidth: WIDTH_OF_THUMBNAIL,
    thumbnailHeight: HEIGHT_OF_THUMBNAIL,
  })

  return [
    { uri: fullSizeURI },
    { uri: packReviewURI },
  ]

}

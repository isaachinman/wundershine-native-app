/* eslint-disable max-len */
import { Dimensions } from 'react-native'

export const SQUARE_REVIEW_FRAME_MARGIN = 50
export const SQUARE_REVIEW_FRAME_DIMENSION = (Dimensions.get('window').width - (SQUARE_REVIEW_FRAME_MARGIN * 2))

// This number is the distance from the edge of image to the edge
// of print (times two), divided by the total width of the image
export const SQUARE_REVIEW_PRINT_MARGIN = (SQUARE_REVIEW_FRAME_MARGIN) +
  (((SQUARE_REVIEW_FRAME_DIMENSION) * 0.46191051995) / 2)
export const SQUARE_REVIEW_PRINT_DIMENSION =
  (SQUARE_REVIEW_FRAME_DIMENSION) * 0.53808948005

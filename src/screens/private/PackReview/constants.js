/* eslint-disable max-len */
import { Dimensions } from 'react-native'

export const SQUARE_REVIEW_FRAME_MARGIN = 50
export const SQUARE_REVIEW_FRAME_DIMENSION = (Dimensions.get('window').width - (SQUARE_REVIEW_FRAME_MARGIN * 2))

export const SQUARE_REVIEW_PRINT_MARGIN = (SQUARE_REVIEW_FRAME_MARGIN) +
  (((SQUARE_REVIEW_FRAME_DIMENSION) * 0.43554443053) / 2)
export const SQUARE_REVIEW_PRINT_DIMENSION =
  (SQUARE_REVIEW_FRAME_DIMENSION) * 0.56445556947

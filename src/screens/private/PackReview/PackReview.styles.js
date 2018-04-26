import { Platform } from 'react-native'

import { blackTertiary, greyBg } from 'styles/colours'
import {
  SQUARE_REVIEW_FRAME_DIMENSION,
  SQUARE_REVIEW_FRAME_MARGIN,
  SQUARE_REVIEW_PRINT_DIMENSION,
  SQUARE_REVIEW_PRINT_MARGIN,
} from './constants'

export default {
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: greyBg,
    flex: 1,
  },
  frame: {
    width: SQUARE_REVIEW_FRAME_DIMENSION,
    height: SQUARE_REVIEW_FRAME_DIMENSION,
    zIndex: 2,
    shadowColor: blackTertiary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  frameContainer: {
    flex: 0,
    margin: SQUARE_REVIEW_FRAME_MARGIN,
    backgroundColor: greyBg,
    ...Platform.select({
      ios: {
        shadowColor: blackTertiary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  print: {
    width: SQUARE_REVIEW_PRINT_DIMENSION,
    height: SQUARE_REVIEW_PRINT_DIMENSION,
    top: SQUARE_REVIEW_PRINT_MARGIN,
    left: SQUARE_REVIEW_PRINT_MARGIN,
    zIndex: 1,
    // top: 0,
    // left: 0,
    position: 'absolute',
  },
  pageControlContainer: {
    flex: 1,
  },
}

import { Platform } from 'react-native'
import { systemWeights } from 'react-native-typography'

import { blackPrimary, greyBg } from 'styles/colours'
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
    width: SQUARE_REVIEW_FRAME_DIMENSION + (SQUARE_REVIEW_FRAME_MARGIN * 2),
    height: SQUARE_REVIEW_FRAME_DIMENSION + (SQUARE_REVIEW_FRAME_MARGIN * 2),
  },
  frame: {
    width: SQUARE_REVIEW_FRAME_DIMENSION,
    height: SQUARE_REVIEW_FRAME_DIMENSION,
    ...Platform.select({
      ios: {
        zIndex: 2,
      },
    }),
  },
  frameContainer: {
    flex: 0,
    margin: SQUARE_REVIEW_FRAME_MARGIN,
    backgroundColor: greyBg,
  },
  print: {
    width: SQUARE_REVIEW_PRINT_DIMENSION,
    height: SQUARE_REVIEW_PRINT_DIMENSION,
    top: SQUARE_REVIEW_PRINT_MARGIN,
    left: SQUARE_REVIEW_PRINT_MARGIN,
    backgroundColor: 'rgba(250,250,250,0.95)',
    ...Platform.select({
      ios: {
        zIndex: 1,
      },
    }),
    position: 'absolute',
  },
  ink: {
    flex: 1,
    resizeMode: 'contain',
  },
  pageControlContainer: {
    flex: 1,
    backgroundColor: greyBg,
  },
  actionBarLabel: {
    ...systemWeights.semibold,
    color: blackPrimary,
  },
}

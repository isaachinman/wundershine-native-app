import { greyAccent, whitePrimary } from 'styles/colours'
import createDimensions from './constants'

const dimensions = createDimensions(68)
const BORDER_WIDTH = 1

export default {
  paper: {
    width: dimensions.SQUARE_FRAME_DIMENSION
      + (dimensions.SQUARE_FRAME_PADDING * 2) + (BORDER_WIDTH * 2),
    height: dimensions.SQUARE_FRAME_DIMENSION +
      (dimensions.SQUARE_FRAME_PADDING + dimensions.SQUARE_FRAME_CHIN),
    padding: dimensions.SQUARE_FRAME_PADDING,
    backgroundColor: whitePrimary,
    borderWidth: BORDER_WIDTH,
    borderColor: '#D1D1D1',
  },
  print: {
    width: dimensions.SQUARE_FRAME_DIMENSION,
    height: dimensions.SQUARE_FRAME_DIMENSION,
  },
  animatedImageContainer: {
    backgroundColor: greyAccent,
  },
}

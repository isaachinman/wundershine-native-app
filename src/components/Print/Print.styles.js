import { greyAccent, whitePrimary } from 'styles/colours'
import createDimensions from './constants'

const dimensions = createDimensions(68)

export default {
  paper: {
    width: dimensions.SQUARE_FRAME_DIMENSION + (dimensions.SQUARE_FRAME_PADDING * 2),
    height: dimensions.SQUARE_FRAME_DIMENSION +
      (dimensions.SQUARE_FRAME_PADDING + dimensions.SQUARE_FRAME_CHIN),
    padding: dimensions.SQUARE_FRAME_PADDING,
    backgroundColor: whitePrimary,
  },
  print: {
    width: dimensions.SQUARE_FRAME_DIMENSION,
    height: dimensions.SQUARE_FRAME_DIMENSION,
  },
  animatedImageContainer: {
    backgroundColor: greyAccent,
  },
}

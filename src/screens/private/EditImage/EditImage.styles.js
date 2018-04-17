import { blackTertiary, greyBg, whitePrimary } from 'styles/colours'
import { SQUARE_FRAME_MARGIN, SQUARE_FRAME_DIMENSION, SQUARE_FRAME_PADDING, SQUARE_FRAME_CHIN } from './constants'

export default {
  content: {
    backgroundColor: greyBg,
    flex: 1,
    flexDirection: 'column',
  },
  paper: {
    margin: SQUARE_FRAME_MARGIN,
    paddingTop: SQUARE_FRAME_PADDING,
    paddingRight: SQUARE_FRAME_PADDING,
    paddingBottom: SQUARE_FRAME_PADDING + SQUARE_FRAME_CHIN,
    paddingLeft: SQUARE_FRAME_PADDING,
    backgroundColor: whitePrimary,
    shadowColor: blackTertiary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 2,
    flex: 0,
    alignSelf: 'center',
  },
  print: {
    alignSelf: 'center',
    width: SQUARE_FRAME_DIMENSION,
    height: SQUARE_FRAME_DIMENSION,
    borderWidth: 0,
    borderColor: whitePrimary,
  },
}

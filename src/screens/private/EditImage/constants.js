import { Dimensions } from 'react-native'

export const SQUARE_FRAME_MARGIN = 30
export const SQUARE_FRAME_DIMENSION = (Dimensions.get('window').width - (SQUARE_FRAME_MARGIN * 2)) * 0.91304347828
export const SQUARE_FRAME_PADDING = SQUARE_FRAME_DIMENSION * 0.04347826086
export const SQUARE_FRAME_CHIN = SQUARE_FRAME_DIMENSION * 0.39130434782

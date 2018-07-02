import { Dimensions } from 'react-native'

const CHIN_RATIO = 0.39130434782
const PADDING_RATIO = 0.04347826086

export const SQUARE_FRAME_MARGIN = 20

let squareFrameDimension = (Dimensions.get('window').width - (SQUARE_FRAME_MARGIN * 2)) * 0.91304347828

const paddingHeight = (squareFrameDimension * PADDING_RATIO * 2)
const chinHeight = squareFrameDimension * CHIN_RATIO
const additionalHeight = paddingHeight + chinHeight
const totalHeight = squareFrameDimension + additionalHeight

if (Dimensions.get('window').height - totalHeight <= 150) {
  squareFrameDimension = Dimensions.get('window').height * 0.42
}

export const SQUARE_FRAME_DIMENSION = squareFrameDimension
export const SQUARE_FRAME_PADDING = SQUARE_FRAME_DIMENSION * PADDING_RATIO
export const SQUARE_FRAME_CHIN = SQUARE_FRAME_DIMENSION * CHIN_RATIO

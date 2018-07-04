import { Dimensions } from 'react-native'

const windowWidth = Dimensions.get('window').width

export const QUEUE_ITEM_HEIGHT = 130
export const QUEUE_ITEM_PADDING = 12
export const QUEUE_IMAGE_DIMENSION = 106
export const QUEUE_ICON_SIZE = 28
export const QUEUE_PADDING_BOTTOM = 300

const widthWithoutText = (QUEUE_ITEM_PADDING * 3) + QUEUE_IMAGE_DIMENSION + (QUEUE_ICON_SIZE * 2)
export const TEXT_CONTAINER_MARGIN_RIGHT = (windowWidth - widthWithoutText) / 3

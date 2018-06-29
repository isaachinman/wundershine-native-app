import { blackPrimary, blackTertiary, red, whitePrimary } from 'styles/colours'
import { Dimensions } from 'react-native'
import { material, systemWeights } from 'react-native-typography'

const BORDER_RADIUS = 10
const LIGHTBOX_MARGIN = 20
const LIGHTBOX_HEIGHT = 300


export default {
  modalContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: Dimensions.get('window').width - (LIGHTBOX_MARGIN * 2),
    maxHeight: LIGHTBOX_HEIGHT,
    borderRadius: BORDER_RADIUS,
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whitePrimary,
  },
  contentContainer: {
    padding: 20,
    width: Dimensions.get('window').width - (LIGHTBOX_MARGIN * 2),
  },
  title: {
    ...systemWeights.light,
    fontSize: 26,
    color: blackPrimary,
    marginBottom: 20,
  },
  description: {
    ...systemWeights.regular,
    fontStyle: 'italic',
    fontSize: 13,
    color: blackTertiary,
  },
  button: {
    borderBottomRightRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
  },
  errorText: {
    ...material.semibold,
    color: red,
    fontSize: 16,
  },
}

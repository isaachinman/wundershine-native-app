import { blackPrimary, blackTertiary, red, whitePrimary } from 'styles/colours'
import { Dimensions } from 'react-native'
import { material, systemWeights } from 'react-native-typography'

const BORDER_RADIUS = 10
const LIGHTBOX_MARGIN = 30
const LIGHTBOX_HEIGHT = 300


export default {
  bg: {
    flex: 1,
    backgroundColor: 'rgba(50,50,50,0.5)',
  },
  container: {
    width: Dimensions.get('window').width - (LIGHTBOX_MARGIN * 2),
    maxHeight: LIGHTBOX_HEIGHT,
    marginVertical: 100,
    marginHorizontal: LIGHTBOX_MARGIN,
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
    fontSize: 30,
    color: blackPrimary,
    marginBottom: 20,
  },
  description: {
    ...systemWeights.light,
    fontStyle: 'italic',
    fontSize: 16,
    color: blackTertiary,
    marginVertical: 10,
    maxWidth: 300,
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

import { Dimensions, Platform } from 'react-native'
import { systemWeights } from 'react-native-typography'
import { whitePrimary, whiteSecondary, whiteTertiary } from 'styles/colours'

const WINDOW_HEIGHT = Dimensions.get('window').height

const HERO_HEIGHT = 380 * (WINDOW_HEIGHT / 700)
const MARGIN_TOP = WINDOW_HEIGHT > 800 ? 90 : 20

export default {
  container: {
    flexGrow: 1,
    backgroundColor: whitePrimary,
  },
  logoGraphic: {
    color: whitePrimary,
    fontSize: 70,
    marginBottom: 34,
  },
  logoText: {
    color: whitePrimary,
    fontSize: 24,
  },
  button: {
    elevation: 0,
    marginTop: 20,
  },
  logoContainer: {
    flex: 0,
    ...Platform.select({
      ios: {
        marginTop: MARGIN_TOP,
      },
    }),
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: 'pink',
    minHeight: HERO_HEIGHT,
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  storeLinkContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  copyRegular: {
    lineHeight: 20,
    flex: 0,
    color: whiteTertiary,
  },
  copyBold: {
    ...systemWeights.semibold,
    lineHeight: 20,
    flex: 0,
    color: whiteSecondary,
  },
}

import { Dimensions, Platform } from 'react-native'
import { systemWeights } from 'react-native-typography'
import { blackThemeBG, whitePrimary, whiteSecondary, whiteTertiary } from 'styles/colours'

const WINDOW_HEIGHT = Dimensions.get('window').height

const HERO_HEIGHT = 380 * (WINDOW_HEIGHT / 700)
const MARGIN_TOP = WINDOW_HEIGHT > 800 ? 90 : 20

export default {
  container: {
    flexGrow: 1,
    backgroundColor: blackThemeBG,
  },
  imageBackgroundInnerFrame: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 80,
    backgroundColor: 'rgba(0,0,0,.75)',
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
    alignItems: 'center',
    minHeight: HERO_HEIGHT,
  },
  buttonContainer: {
    flex: 1,
    paddingTop: 15,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
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

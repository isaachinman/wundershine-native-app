import { systemWeights } from 'react-native-typography'
import { blackThemeBG, whitePrimary, whiteSecondary, whiteTertiary } from 'styles/colours'

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
  backgroundContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    flex: 0,
    width: '100%',
    paddingTop: 15,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
  },
  buttonTextRegular: {
    ...systemWeights.regular,
    color: whitePrimary,
  },
  buttonTextLight: {
    ...systemWeights.light,
    color: whitePrimary,
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

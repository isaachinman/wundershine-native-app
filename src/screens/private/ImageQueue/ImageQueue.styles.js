import { blackPrimary, blackSecondary, blackTertiary, whitePrimary, whiteTertiary, greyBg } from 'styles/colours'
import { Dimensions } from 'react-native'
import { material, systemWeights } from 'react-native-typography'

const screenHeight = Dimensions.get('window').height
const sizingFactor = (((screenHeight / 4) - 180) / 100) + 1

export default {
  header: {
    backgroundColor: whitePrimary,
  },
  iconMenu: {
    fontSize: 30,
    color: blackSecondary,
  },
  headerBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  headerTitle: {
    ...material.titleObject,
    ...systemWeights.bold,
  },
  content: {
    backgroundColor: greyBg,
    flex: 1,
  },
  right: {
    paddingRight: 10,
  },
  heading: {
    ...material.headlineObject,
    color: '#616161',
  },
  subheading: {
    ...material.subheadingObject,
    color: whiteTertiary,
    textAlign: 'center',
    margin: 20,
  },
  emptyUIContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyQueueArrow: {
    height: 180 * sizingFactor,
    width: 30 * sizingFactor,
  },
  errorUIContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  circularButton: {
    alignSelf: 'center',
    position: 'absolute',
    elevation: 4,
    height: 70,
    width: 70,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 35,
    backgroundColor: whitePrimary,
    justifyContent: 'center',
    marginBottom: 30,
    shadowColor: blackTertiary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  circularButtonIcon: {
    color: blackTertiary,
    fontSize: 40,
  },
  packPickerArrow: {
    fontSize: 12,
    marginLeft: 4,
    color: blackSecondary,
  },
  packPickerSelectionText: {
    ...material.buttonObject,
    ...systemWeights.semibold,
    color: blackPrimary,
    fontSize: 14,
  },
}

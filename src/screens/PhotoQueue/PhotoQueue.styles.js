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
    justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyQueueArrow: {
    height: 180 * sizingFactor,
    width: 30 * sizingFactor,
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

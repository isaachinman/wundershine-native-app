import { blackPrimary, blackSecondary, blackTertiary, blue, greyAccent, whitePrimary, whiteSecondary, whiteTertiary, greyBg } from 'styles/colours'
import { Dimensions } from 'react-native'
import { material, systemWeights } from 'react-native-typography'

import { QUEUE_PADDING_BOTTOM } from './constants'

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
  nextEnabled: {
    ...systemWeights.semibold,
    color: blue,
  },
  nextDisabled: {
    color: whiteSecondary,
  },
  flatlist: {
    paddingBottom: QUEUE_PADDING_BOTTOM,
  },
  content: {
    backgroundColor: greyBg,
    flex: 1,
    flexDirection: 'column',
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
  helperUIContainer: {
    paddingTop: 35,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  helperUIHeading: {
    ...systemWeights.light,
    color: '#616161',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  helperUISubheading: {
    ...systemWeights.light,
    color: whiteTertiary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 300,
  },
  packnamePlaceholder: {
    width: 40,
    height: 8,
    marginRight: 5,
    justifyContent: 'center',
    backgroundColor: greyAccent,
  },
}

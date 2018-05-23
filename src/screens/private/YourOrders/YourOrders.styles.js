import { greyBg, blackPrimary, blackTertiary, blackSecondary, whiteSecondary } from 'styles/colours'
import { systemWeights } from 'react-native-typography'

export default {
  content: {
    backgroundColor: greyBg,
    flex: 1,
  },
  greyBg: {
    backgroundColor: greyBg,
  },
  listItemText: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
    display: 'flex',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconArrow: {
    fontSize: 26,
    color: whiteSecondary,
    marginRight: 20,
  },
  timestamp: {
    ...systemWeights.light,
    color: blackTertiary,
    flex: 0,
    marginRight: 15,
  },
  items: {
    ...systemWeights.semibold,
    color: blackPrimary,
    flex: 0,
    marginRight: 5,
  },
  price: {
    ...systemWeights.normal,
    color: blackSecondary,
    flex: 0,
    alignSelf: 'flex-end',
  },
}

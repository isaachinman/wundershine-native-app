import { blue, red, blackPrimary, whitePrimary, whiteSecondary } from 'styles/colours'
import { systemWeights } from 'react-native-typography'

export default {
  header: {
    backgroundColor: whitePrimary,
  },
  content: {
    flex: 1,
    backgroundColor: whitePrimary,
  },
  headerTitle: {
    color: blackPrimary,
  },
  iconLarge: {
    color: blue,
    fontSize: 44,
    marginHorizontal: 20,
  },
  iconLogout: {
    color: red,
    fontSize: 44,
    marginHorizontal: 20,
  },
  iconArrow: {
    fontSize: 26,
    color: whiteSecondary,
    marginRight: 20,
  },
  listItemText: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    display: 'flex',
    paddingHorizontal: 20,
  },
  textLabel: {
    ...systemWeights.regular,
  },
}

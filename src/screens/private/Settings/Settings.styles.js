import { blue, red, blackPrimary, whitePrimary, whiteSecondary } from 'styles/colours'

export default {
  header: {
    backgroundColor: whitePrimary,
  },
  headerTitle: {
    color: blackPrimary,
  },
  content: {
    paddingTop: 50,
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
    borderBottomColor: '#C4C4C4',
    display: 'flex',
    paddingHorizontal: 30,
  },
}

import { blue, red, greyBg, blackPrimary, whitePrimary, whiteSecondary } from 'styles/colours'

export default {
  header: {
    backgroundColor: whitePrimary,
  },
  headerTitle: {
    color: blackPrimary,
  },
  content: {
    backgroundColor: greyBg,
    flex: 1,
  },
  greyBg: {
    backgroundColor: greyBg,
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
    justifyContent: 'center',
  },
}

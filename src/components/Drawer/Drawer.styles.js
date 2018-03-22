import { blue, blackPrimary, greyAccent, whitePrimary, greyBg } from 'styles/colours'

export default {
  header: {
    backgroundColor: greyBg,
  },
  content: {
    backgroundColor: whitePrimary,
  },
  footer: {
    backgroundColor: greyBg,
  },
  blackText: {
    color: blackPrimary,
  },
  iconLarge: {
    color: blue,
    fontSize: 44,
    marginHorizontal: 20,
  },
  listItemText: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: greyAccent,
    display: 'flex',
    justifyContent: 'center',
  },
}

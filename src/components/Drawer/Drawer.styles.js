import { blue, blackTertiary, greyAccent, whitePrimary, greyBg } from 'styles/colours'
import { material } from 'react-native-typography'

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
  title: {
    ...material.subheadingObject,
    color: blackTertiary,
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

import { blackTertiary, whitePrimary, greyBg } from 'styles/colours'
import { material } from 'react-native-typography'
import { Platform } from 'react-native'

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
    color: blackTertiary,
    fontSize: 26,
    marginHorizontal: 25,
  },
  listItemText: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: greyBg,
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    ...material.titleObject,
    fontSize: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      android: {
        paddingLeft: 10,
      },
    }),
  },
  logoGraphic: {
    fontSize: 30,
    marginRight: 10,
  },
  logoText: {
    fontSize: 14,
  },
}

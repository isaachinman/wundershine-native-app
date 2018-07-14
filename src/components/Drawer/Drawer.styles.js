import { blackTertiary, whitePrimary, greenLight, greyBg } from 'styles/colours'
import { material } from 'react-native-typography'
import { Platform } from 'react-native'

export default {
  header: {
    backgroundColor: greenLight,
    height: 100,
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
    fontSize: 24,
    marginHorizontal: 22,
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
    color: whitePrimary,
    fontSize: 30,
    marginRight: 10,
  },
  logoText: {
    color: whitePrimary,
    fontSize: 16,
  },
}

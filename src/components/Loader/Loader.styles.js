import { Platform } from 'react-native'

export default {
  absoluteContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...Platform.select({
      ios: {
        zIndex: 99999,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

import { blackPrimary, red, whitePrimary } from 'styles/colours'
import { material } from 'react-native-typography'

export default {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whitePrimary,
  },
  iconAlert: {
    color: red,
    fontSize: 100,
    marginBottom: 20,
  },
  title: {
    ...material.headlineObject,
    fontSize: 30,
    color: blackPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...material.body2Object,
    fontSize: 20,
    color: '#616161',
    marginVertical: 30,
    maxWidth: 300,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}

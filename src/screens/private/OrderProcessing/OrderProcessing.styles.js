import { blackPrimary, whitePrimary } from 'styles/colours'
import { material } from 'react-native-typography'

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whitePrimary,
  },
  activityIndicatorContainer: {
    marginTop: 20,
    marginBottom: 50,
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
    maxWidth: 340,
    textAlign: 'center',
  },
}

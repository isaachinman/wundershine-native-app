import { blackPrimary, green, whitePrimary } from 'styles/colours'
import { material, systemWeights } from 'react-native-typography'

export default {
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: whitePrimary,
  },
  iconCheckmark: {
    color: green,
    fontSize: 100,
    marginBottom: 20,
  },
  title: {
    ...material.headlineObject,
    ...systemWeights.semibold,
    fontSize: 22,
    color: blackPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...material.body2Object,
    ...systemWeights.regular,
    fontSize: 16,
    color: '#616161',
    marginVertical: 25,
    maxWidth: 250,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}

import { material } from 'react-native-typography'
import { greenLight, whitePrimary } from 'styles/colours'

export default {
  content: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingVertical: 20,
  },
  row: {
    flex: 0,
    backgroundColor: whitePrimary,
    padding: 15,
    marginBottom: 12,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  iconRadioButtonOff: {
    flex: 0,
    fontSize: 30,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  iconRadioButtonOn: {
    color: greenLight,
    flex: 0,
    fontSize: 30,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  radioButtonLabel: {
    ...material.body2Object,
    flex: 0,
    fontSize: 17,
  },
  iconIdeal: {
    width: 35,
    height: 35,
  },
}

import { greyAccent, whitePrimary } from 'styles/colours'

export default {
  content: {
    flex: 1,
    backgroundColor: greyAccent,
    paddingVertical: 20,
  },
  row: {
    flex: 0,
    backgroundColor: whitePrimary,
    padding: 20,
    marginBottom: 20,
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  iconRadioButton: {
    flex: 0,
    fontSize: 30,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  radioButtonLabel: {
    flex: 0,
    fontSize: 20,
  },
  iconIdeal: {
    width: 50,
    height: 50,
  },
}

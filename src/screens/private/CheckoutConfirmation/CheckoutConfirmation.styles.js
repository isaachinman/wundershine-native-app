import { systemWeights } from 'react-native-typography'
import { blackPrimary, blue, greyAccent, whitePrimary } from 'styles/colours'

export default {
  content: {
    flex: 1,
    backgroundColor: greyAccent,
    paddingTop: 20,
  },
  row: {
    flex: 0,
    backgroundColor: whitePrimary,
    padding: 20,
    marginBottom: 20,
  },
  endRow: {
    flex: 0,
    backgroundColor: whitePrimary,
    padding: 20,
    alignSelf: 'flex-end',
  },
  titleCol: {
    flex: 0,
    minWidth: 100,
    paddingRight: 15,
  },
  contentCol: {
    flex: 1,
  },
  editCol: {
    flex: 0,
    alignItems: 'flex-end',
    minWidth: 60,
    paddingLeft: 15,
  },
  sectionTitle: {
    ...systemWeights.semibold,
    color: blackPrimary,
    fontSize: 15,
  },
  sectionBody: {
    color: '#616161',
    fontSize: 15,
  },
  editText: {
    color: blue,
    fontSize: 15,
  },
}

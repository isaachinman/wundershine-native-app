import { systemWeights } from 'react-native-typography'
import { blackPrimary, blue, greyBg, whitePrimary } from 'styles/colours'

export default {
  content: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: 20,
  },
  row: {
    flex: 0,
    backgroundColor: whitePrimary,
    padding: 20,
    marginBottom: 12,
  },
  endRow: {
    flex: 0,
    backgroundColor: whitePrimary,
    padding: 20,
    alignSelf: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: greyBg,
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
    fontSize: 14,
  },
  sectionBody: {
    color: '#616161',
    fontSize: 14,
  },
  editText: {
    color: blue,
    fontSize: 14,
  },
}

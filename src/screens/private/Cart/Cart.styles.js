import { blackPrimary, blackSecondary, blackTertiary, blue, green, red, whitePrimary, greyBg } from 'styles/colours'
import { Dimensions } from 'react-native'
import { systemWeights } from 'react-native-typography'

const ROW_HEIGHT = 50

export default {
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  content: {
    flex: 1,
    minHeight: Dimensions.get('window').height - ROW_HEIGHT - 100,
  },
  itemContainer: {
    padding: 20,
  },
  itemRow: {
    flex: 0,
    marginBottom: 30,
  },
  col1: {
    flex: 0,
  },
  col2: {
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 10,
    flex: 1,
  },
  col3: {
    flex: 0,
    alignItems: 'flex-end',
  },
  productName: {
    fontSize: 17,
    color: blackPrimary,
    marginBottom: 7,
  },
  forFrame: {
    fontSize: 14,
    color: blackSecondary,
    marginBottom: 7,
  },
  productPrice: {
    ...systemWeights.light,
    fontSize: 15,
    color: '#616161',
  },
  iconMore: {
    fontSize: 28,
    color: blackTertiary,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 30,
    paddingLeft: 30,
  },
  iconClose: {
    fontSize: 24,
    color: red,
    marginLeft: 5,
  },
  pricingRow: {
    height: ROW_HEIGHT,
    borderTopWidth: 1,
    borderTopColor: greyBg,
    padding: 15,
  },
  pricingRowLast: {
    height: ROW_HEIGHT,
    borderTopWidth: 1,
    borderTopColor: greyBg,
    borderBottomWidth: 1,
    borderBottomColor: greyBg,
    padding: 15,
  },
  pricingTextNormal: {
    fontSize: 14,
    color: blackPrimary,
  },
  addDiscountCode: {
    fontSize: 14,
    color: blue,
  },
  pricingTextBold: {
    ...systemWeights.semibold,
    fontSize: 14,
    color: blackPrimary,
  },
  actionBar: {
    height: 60,
    flexDirection: 'row',
  },
  actionBarAddPack: {
    alignItems: 'center',
    flex: 1,
  },
  actionBarAddPackText: {
    ...systemWeights.semibold,
    lineHeight: 60,
    fontSize: 14,
    color: blackSecondary,
  },
  actionBarCheckout: {
    backgroundColor: green,
    alignItems: 'center',
    flex: 1,
  },
  actionBarCheckoutText: {
    ...systemWeights.semibold,
    lineHeight: 60,
    fontSize: 14,
    color: whitePrimary,
    paddingHorizontal: 10,
  },
  editPackText: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  deletePackText: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: red,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  quantityPickerContainer: {
    flex: 0,
    backgroundColor: whitePrimary,
  },
  quantityPickerHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  quantityPickerHeaderText: {
    ...systemWeights.semibold,
    fontSize: 20,
  },
  quantityPickerNumLabel: {
    paddingHorizontal: 30,
  },
  iconPackQuantityCheckmark: {
    color: blue,
    fontSize: 30,
  },
}

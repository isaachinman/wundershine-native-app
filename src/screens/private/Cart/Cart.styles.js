import { blackPrimary, blackSecondary, blackTertiary, blue, greyAccent, green, red, whitePrimary, greyBg } from 'styles/colours'
import { Dimensions } from 'react-native'
import { systemWeights } from 'react-native-typography'

const ROW_HEIGHT = 60

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
    fontSize: 22,
    color: blackPrimary,
    marginBottom: 8,
  },
  forFrame: {
    fontSize: 16,
    color: blackSecondary,
    marginBottom: 8,
  },
  productPrice: {
    ...systemWeights.light,
    fontSize: 18,
    color: '#616161',
  },
  stepperContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  iconStep: {
    fontSize: 28,
    color: blackTertiary,
  },
  stepLabel: {
    fontSize: 22,
    paddingHorizontal: 10,
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
    padding: 20,
  },
  pricingTextNormal: {
    fontSize: 16,
    color: blackPrimary,
  },
  addDiscountCode: {
    fontSize: 16,
    color: blue,
  },
  pricingTextBold: {
    ...systemWeights.bold,
    fontSize: 16,
    color: blackPrimary,
  },
  actionBar: {
    height: ROW_HEIGHT,
    borderTopWidth: 1,
    borderTopColor: greyAccent,
    flexDirection: 'row',
  },
  actionBarAddPack: {
    alignItems: 'center',
    flex: 1,
  },
  actionBarAddPackText: {
    ...systemWeights.semibold,
    lineHeight: ROW_HEIGHT,
    fontSize: 16,
    color: blackSecondary,
  },
  actionBarCheckout: {
    backgroundColor: green,
    alignItems: 'center',
    flex: 1,
  },
  actionBarCheckoutText: {
    ...systemWeights.semibold,
    lineHeight: ROW_HEIGHT,
    fontSize: 16,
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

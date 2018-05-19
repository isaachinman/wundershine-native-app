import { blackPrimary, blackSecondary, blackTertiary, greyAccent, green, red, whitePrimary, greyBg } from 'styles/colours'
import { systemWeights } from 'react-native-typography'

const ROW_HEIGHT = 60

export default {
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    marginBottom: ROW_HEIGHT,
  },
  itemContainer: {
    padding: 20,
    flex: 1,
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
    marginTop: 15,
    paddingLeft: 30,
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
  pricingTextBold: {
    ...systemWeights.bold,
    fontSize: 16,
    color: blackPrimary,
  },
  actionBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
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
}

import { material, systemWeights } from 'react-native-typography'
import { blackPrimary, blackSecondary, whitePrimary } from 'styles/colours'

const styles = {
  header: {
    backgroundColor: whitePrimary,
  },
  headerTitle: {
    ...material.subheadingObject,
    ...systemWeights.semibold,
  },
  container: {
    backgroundColor: whitePrimary,
  },
  content: {
    ...material.bodyObject,
    padding: 15,
    flexDirection: 'column',
  },
  subheading: {
    ...material.subheadingObject,
    ...systemWeights.light,
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
    maxWidth: 300,
  },
  touchableOpacity: {
    width: '100%',
  },
  packRow: {
    marginBottom: 15,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 30,
    marginLeft: 10,
    marginVertical: 20,
    minHeight: 150,
  },
  textContainer: {
    paddingVertical: 20,
    paddingRight: 30,
    marginTop: 15,
  },
  packTitle: {
    ...systemWeights.semibold,
    color: blackPrimary,
    fontSize: 16,
    marginBottom: 12,
    width: 80,
  },
  packCheck: {
    alignSelf: 'flex-end',
    width: 30,
    height: 30,
    marginTop: -5,
  },
  packPrice: {
    ...systemWeights.light,
    color: blackSecondary,
    fontSize: 22,
    marginBottom: 12,
  },
  packShipping: {
    ...systemWeights.light,
    color: blackSecondary,
    fontSize: 14,
    marginBottom: 12,
  },
  packImage: {
    flex: 1,
    width: null,
    height: null,
  },
  iconClose: {
    fontSize: 38,
    color: blackPrimary,
  },
}

styles.packRowSelected = {
  ...styles.packRow,
  backgroundColor: 'rgba(235,235,235,0.75)',
  borderWidth: 1,
  borderColor: '#dddddd',
}

export default styles

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
    backgroundColor: 'rgba(250,250,250,0.9)',
  },
  content: {
    ...material.bodyObject,
    padding: 15,
    flexDirection: 'column',
  },
  subheading: {
    ...material.subheadingObject,
    ...systemWeights.light,
    textAlign: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  touchableOpacity: {
    width: '100%',
  },
  packRow: {
    marginBottom: 15,
    padding: 30,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  imageContainer: {
    position: 'relative',
    marginRight: 30,
  },
  textContainer: {
    paddingVertical: 20,
  },
  packTitle: {
    ...systemWeights.semibold,
    color: blackPrimary,
    fontSize: 20,
    marginBottom: 15,
    width: 80,
  },
  packCheck: {
    alignSelf: 'flex-end',
    width: 30,
    height: 30,
  },
  packPrice: {
    ...systemWeights.light,
    color: blackSecondary,
    fontSize: 22,
    marginBottom: 15,
  },
  packShipping: {
    ...systemWeights.light,
    color: blackSecondary,
    fontSize: 12,
    marginBottom: 15,
  },
  packImage: {
    flex: 1,
    width: null,
    height: null,
  },
  iconClose: {
    fontSize: 44,
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

import { material, systemWeights } from 'react-native-typography'
import { blackPrimary, whitePrimary, greyAccent } from 'styles/colours'

const styles = {
  header: {
    backgroundColor: greyAccent,
    paddingTop: 0,
  },
  headerTitle: {
    ...material.subheadingObject,
    ...systemWeights.semibold,
    width: 130,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    backgroundColor: whitePrimary,
    marginVertical: 50,
    marginHorizontal: 15,
  },
  content: {
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  subheading: {
    ...material.subheadingObject,
    ...systemWeights.light,
    textAlign: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  contentTitle: {
    ...material.titleObject,
    marginBottom: 20,
  },
  paragraph: {
    ...material.body1Object,
    marginBottom: 15,
  },
  bulletPoint: {
    ...material.body1Object,
    marginBottom: 10,
    marginLeft: 15,
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

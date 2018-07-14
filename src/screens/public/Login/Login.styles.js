import { transparentBlack, whitePrimary } from 'styles/colours'
import { material } from 'react-native-typography'

export default {
  container: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: whitePrimary,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: transparentBlack,
  },
  forgotPassword: {
    ...material.captionObject,
    color: whitePrimary,
    textAlign: 'right',
  },
}

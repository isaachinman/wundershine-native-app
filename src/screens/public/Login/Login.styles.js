import { blackThemeBG, whitePrimary } from 'styles/colours'
import { material } from 'react-native-typography'

export default {
  container: {
    flexGrow: 1,
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: blackThemeBG,
  },
  forgotPassword: {
    ...material.captionObject,
    color: whitePrimary,
    textAlign: 'right',
  },
}

import { whitePrimary } from 'styles/colours'

export default {
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: whitePrimary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
    minHeight: '100%',
  },
  main: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 50,
  },
  footer: {
    width: '100%',
    flex: 0,
  },
}

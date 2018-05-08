import { blackTertiary } from 'styles/colours'

export default {
  container: {
    width: 160,
    height: 160,
    borderWidth: 1,
    borderColor: 'black',
    margin: 50,
  },
  offsetAdjuster: {
    position: 'absolute',
    left: 27,
  },
  print: {
    position: 'absolute',
  },
  angles: {
    0: 0,
    1: -5,
    2: -5,
    3: 3,
    4: -1,
  },
  offsets: {
    0: {
      top: 0,
      left: 0,
    },
    1: {
      top: 10,
      left: 15,
    },
    2: {
      top: 20,
      left: 25,
    },
    3: {
      top: 20,
      left: -13,
    },
    4: {
      top: 10,
      left: -25,
    },
  },
  shadow: {
    shadowColor: blackTertiary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
}

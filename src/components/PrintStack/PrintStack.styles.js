import { blackTertiary } from 'styles/colours'

export default {
  container: {
    width: 110,
    height: 110,
  },
  offsetAdjuster: {
    position: 'absolute',
    left: 18,
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
      top: 7,
      left: 10,
    },
    2: {
      top: 14,
      left: 17,
    },
    3: {
      top: 14,
      left: -10,
    },
    4: {
      top: 7,
      left: -17,
    },
  },
  shadow: {
    shadowColor: blackTertiary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },
}

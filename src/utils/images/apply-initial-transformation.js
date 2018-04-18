import { fillTransformation } from 'utils/images/transformation-defaults'

export default image => ({
  ...image,
  transformation: fillTransformation(image),
})

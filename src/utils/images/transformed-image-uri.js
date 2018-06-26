import { cloudinary } from 'utils/images'

export default (image, _options) => {

  const options = typeof _options === 'undefined' ? {} : _options

  const { cloudinaryID, transformation } = image

  const WIDTH_OF_SELECTION = transformation.rightBoundary - transformation.leftBoundary
  const HEIGHT_OF_SELECTION = transformation.bottomBoundary - transformation.topBoundary

  let secondaryTransformation = {}

  if (options.thumbnail && options.thumbnailWidth && options.thumbnailHeight) {
    secondaryTransformation = {
      width: Math.round(options.thumbnailWidth),
      height: Math.round(options.thumbnailHeight),
      crop: 'thumb',
    }
  }

  return cloudinary.url(cloudinaryID, {
    transformation: [
      {
        angle: transformation.rotation,
        width: WIDTH_OF_SELECTION,
        height: HEIGHT_OF_SELECTION,
        crop: 'crop',
        x: transformation.leftBoundary,
        y: transformation.topBoundary,
      },
      secondaryTransformation,
    ],
  })

}

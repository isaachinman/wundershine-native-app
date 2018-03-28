import { Image } from 'react-native'

const MAX_IMAGE_SIZE_BYTES = 25000000
const MIN_IMAGE_WIDTH = 1500
const MIN_IMAGE_HEIGHT = 1500

export default async (images) => {

  // https://github.com/wkh237/react-native-fetch-blob/issues/685
  const RNFetchBlob = require('react-native-fetch-blob').default

  const rejectedImages = []
  const validatedImages = []

  await Promise.all(images.map(async (image) => {

    let isValid = true
    let error = null

    // Check filesize
    const stats = await RNFetchBlob.fs.stat(image.value)
    if (stats.size > MAX_IMAGE_SIZE_BYTES) {
      isValid = false
      error = 'FILE_SIZE_TOO_BIG'
    }

    // Check image dimensions
    await new Promise((resolve) => {
      Image.getSize(image.value, (width, height) => {
        if (width < MIN_IMAGE_WIDTH || height < MIN_IMAGE_HEIGHT) {
          isValid = false
          error = 'RESOLUTION_TOO_SMALL'
        }
        resolve()
      })
    })

    if (isValid) {
      validatedImages.push(image)
    } else {
      rejectedImages.push({
        ...image,
        error,
      })
    }

  }))

  return {
    rejectedImages,
    validatedImages,
  }

}

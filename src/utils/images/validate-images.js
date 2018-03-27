import { Image } from 'react-native'

// const MAX_IMAGE_SIZE_MB = 25
const MIN_IMAGE_WIDTH = 1500
const MIN_IMAGE_HEIGHT = 1500

export default async (images) => {

  const rejectedImages = []
  const validatedImages = []

  images.forEach((image) => {

    let isValid = true
    let error = null

    // Check image dimensions
    Image.getSize(image.value, (width, height) => {

      if (width < MIN_IMAGE_WIDTH || height < MIN_IMAGE_HEIGHT) {
        isValid = false
        error = 'TOO_SMALL'
      }

      if (isValid) {
        validatedImages.push(image)
      } else {
        rejectedImages.push({
          ...image,
          error,
        })
      }

    })

  })

  return {
    rejectedImages,
    validatedImages,
  }

}

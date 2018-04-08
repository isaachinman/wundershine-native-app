import bytes from 'bytes'
import config from 'config'
import { Image } from 'react-native'
import path from 'react-native-path'

import { createValidatedImage } from 'models'

export default async (images, queueType) => {

  if (images.length === 0) {
    throw new Error('No images provided to validate-images.')
  }

  /* Settings */
  const { MAX_IMAGE_SIZE_MB, MIN_IMAGE_WIDTH, MIN_IMAGE_HEIGHT } = config.imageSettings[queueType]

  /* Arrays to return */
  const rejectedImages = []
  const validatedImages = []

  if (images[0].width && images[0].height) {

    /* PATH #1: Images coming from react-native-image-crop-picker */
    /*
      Incoming data looks like:
      {
        creationDate: "1344451932",
        cropRect: null,
        data: null,
        exif: null,
        filename: "IMG_0004.jpg",
        height: 2002,
        localIdentifier: "9F983DBA-EC35-42B8-8773-B597CF782EDD/L0/001",
        mime: "image/jpeg",
        path: "CoreSimulator/Devices/data/images/my-image.jpg",
        size: 2505426,
        width: 3000,
      }
    */

    images.forEach((image) => {

      let isValid = true
      let error = null

      // Try to determine origin from exif data
      let make = null
      let model = null
      if (image.exif && image.exif['{TIFF}']) {
        if (image.exif['{TIFF}'].Make) {
          make = image.exif['{TIFF}'].Make
        }
        if (image.exif['{TIFF}'].Model) {
          model = image.exif['{TIFF}'].Model
        }
      }

      const imageToReturn = {
        uri: image.path,
        name: image.filename || path.basename(image.path),
        type: image.mime === 'image/jpeg' ? 'jpg' : null,
        bytes: image.size,
        width: image.width,
        height: image.height,
        metadata: {
          camera: { make, model },
        },
      }

      if (image.size > bytes.parse(bytes.parse(`${MAX_IMAGE_SIZE_MB}mb`))) {
        isValid = false
        error = 'FILE_SIZE_TOO_BIG'
      }

      if (image.width < MIN_IMAGE_WIDTH || image.height < MIN_IMAGE_HEIGHT) {
        isValid = false
        error = 'RESOLUTION_TOO_SMALL'
      }

      if (isValid) {
        validatedImages.push(createValidatedImage(imageToReturn))
      } else {
        rejectedImages.push({
          ...image,
          error,
        })
      }

    })


  } else {

    /* PATH #2: Images coming from share extension or elsewhere */
    /*
      Incoming data looks like:
      {
        type: "jpg",
        value: "CoreSimulator/Devices/data/images/my-image.jpg"
      }
    */

    // https://github.com/wkh237/react-native-fetch-blob/issues/685
    const RNFetchBlob = require('react-native-fetch-blob').default

    await Promise.all(images.map(async (image) => {

      let isValid = true
      let error = null

      const imageToReturn = {
        uri: image.value,
        name: path.basename(image.value),
        type: image.type,
        bytes: null,
        width: null,
        height: null,
        metadata: {
          camera: {
            make: null,
            model: null,
          },
        },
      }

      // Check filesize
      const stats = await RNFetchBlob.fs.stat(image.value)
      imageToReturn.bytes = stats.size

      if (stats.size > bytes.parse(bytes.parse(`${MAX_IMAGE_SIZE_MB}mb`))) {
        isValid = false
        error = 'FILE_SIZE_TOO_BIG'
      }

      // Check image dimensions
      await new Promise((resolve) => {
        Image.getSize(image.value, (width, height) => {
          imageToReturn.width = width
          imageToReturn.height = height
          if (width < MIN_IMAGE_WIDTH || height < MIN_IMAGE_HEIGHT) {
            isValid = false
            error = 'RESOLUTION_TOO_SMALL'
          }
          resolve()
        })
      })

      if (isValid) {
        validatedImages.push(createValidatedImage(imageToReturn))
      } else {
        rejectedImages.push({
          ...image,
          error,
        })
      }

    }))
  }

  return {
    rejectedImages,
    validatedImages,
  }

}

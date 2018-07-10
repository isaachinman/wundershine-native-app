import bytes from 'bytes'
import { Image } from 'react-native'
import RNFS from 'react-native-fs'
import path from 'react-native-path'

import { applyInitialTransformation } from 'utils/images'
import { createValidatedImage } from 'models'

const MAX_IMAGE_SIZE_MB = 55

export const validationErrors = {
  FILE_SIZE_TOO_BIG: {
    value: 'FILE_SIZE_TOO_BIG',
  },
  UNSUPPORTED_FORMAT: {
    value: 'UNSUPPORTED_FORMAT',
  },
}

const jpegFormatStrings = ['image/jpeg', 'jpg']
const jpegPathStrings = ['.jpeg', '.jpg']
const imageIsJPEG = (pathString, mime) => {
  let isJPEG = false
  if (jpegFormatStrings.includes(mime)) {
    isJPEG = true
  } else if (jpegPathStrings.includes(path.extname(pathString))) {
    isJPEG = true
  }
  return isJPEG
}

export default async (images) => {

  if (images.length === 0) {
    throw new Error('No images provided to validate-images.')
  }

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

    await Promise.all(images.map(async (image) => {

      let isValid = true
      let error = null

      const imageToReturn = {
        uri: image.path,
        name: image.filename || path.basename(image.path),
        type: imageIsJPEG(image.path, image.mime) ? 'jpg' : null,
        bytes: image.size,
        width: null,
        height: null,
      }

      if (!jpegFormatStrings.includes(image.mime)) {
        isValid = false
        error = validationErrors.UNSUPPORTED_FORMAT
      }

      if (image.size > bytes.parse(bytes.parse(`${MAX_IMAGE_SIZE_MB}mb`))) {
        isValid = false
        error = validationErrors.FILE_SIZE_TOO_BIG
      }

      // Check image dimensions
      await new Promise((resolve) => {
        Image.getSize(image.path, (width, height) => {
          imageToReturn.width = width
          imageToReturn.height = height
          resolve()
        })
      })

      if (isValid) {
        validatedImages.push(createValidatedImage(applyInitialTransformation(imageToReturn)))
      } else {
        rejectedImages.push({
          ...image,
          error,
        })
      }

    }))


  } else {

    /* PATH #2: Images coming from share extension or elsewhere */
    /*
      Incoming data looks like:
      {
        type: "jpg",
        value: "CoreSimulator/Devices/data/images/my-image.jpg"
      }
    */

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
      }

      // Check filesize
      const stats = await RNFS.stat(image.value)
      imageToReturn.bytes = stats.size

      if (stats.size > bytes.parse(bytes.parse(`${MAX_IMAGE_SIZE_MB}mb`))) {
        isValid = false
        error = 'FILE_SIZE_TOO_BIG'
      }

      if (!imageIsJPEG(image.value, image.type)) {
        isValid = false
        error = validationErrors.UNSUPPORTED_FORMAT
      }

      // Check image dimensions
      await new Promise((resolve) => {
        Image.getSize(image.value, (width, height) => {
          imageToReturn.width = width
          imageToReturn.height = height
          resolve()
        })
      })

      if (isValid) {
        validatedImages.push(createValidatedImage(applyInitialTransformation(imageToReturn)))
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

import config from 'config'
import stores from 'stores'
import { Platform } from 'react-native'
import Upload from 'react-native-background-upload'

export default async (_image, queueType) => {

  const image = Object.assign({}, _image)

  if (Platform.OS === 'ios' && !image.uri.includes('file://')) {
    image.uri = `file://${image.uri}`
    image.uri = encodeURI(image.uri)
  }

  if (Platform.OS === 'android') {
    image.uri = image.uri.replace('file://', '')
  }

  const {
    name,
    uri,
    type,
    transformation,
  } = image

  const {
    topBoundary,
    rightBoundary,
    bottomBoundary,
    leftBoundary,
    rotation,
  } = transformation

  const options = {
    url: `${config.API_ROOT}/pv/queue/${queueType}/images/create`,
    path: uri,
    method: 'POST',
    type: 'raw',
    headers: {
      Authorization: `Bearer ${stores.auth.token}`,
      'content-type': 'application/octet-stream',
      'image-data': JSON.stringify({
        name,
        uri,
        type,
        topBoundary,
        rightBoundary,
        bottomBoundary,
        leftBoundary,
        rotation,
      }),
    },
    // Android-only options
    notification: {
      enabled: false,
    },
  }

  const uploadID = await Upload.startUpload(options)

  return new Promise((resolve, reject) => {
    Upload.addListener('cancelled', uploadID, (data) => {
      console.log('Cancelled!', data) // eslint-disable-line
    })
    Upload.addListener('error', uploadID, (data) => {
      console.log(`Error: ${data.error}%`) // eslint-disable-line
      reject(data)
    })
    Upload.addListener('completed', uploadID, (data) => {
      console.log('Completed!', data) // eslint-disable-line
      if (data.responseCode === 200) {
        resolve(JSON.parse(data.responseBody))
      } else {
        reject(data)
      }
    })
  })

}

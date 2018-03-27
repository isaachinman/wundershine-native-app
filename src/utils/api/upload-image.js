import config from 'config'
import stores from 'stores'
import { Platform } from 'react-native'
import Upload from 'react-native-background-upload'

export default async (_image) => {

  const image = Object.assign({}, _image)

  if (Platform.OS === 'ios') {
    image.uri = `file://${image.uri}`
  }

  if (Platform.OS === 'android') {
    image.uri = image.uri.replace('file://', '')
  }

  const options = {
    url: `${config.API_ROOT}/pv/queue/add-image`,
    path: image.uri,
    method: 'POST',
    type: 'raw',
    headers: {
      Authorization: `Bearer ${stores.auth.token}`,
      'content-type': 'application/octet-stream',
    },
    // Android-only options
    notification: {
      enabled: true,
    },
  }

  const uploadID = await Upload.startUpload(options)

  return new Promise((resolve, reject) => {
    Upload.addListener('error', uploadID, (data) => {
      console.log(`Error: ${data.error}%`) // eslint-disable-line
      reject()
    })
    Upload.addListener('completed', uploadID, (data) => {
      console.log('Completed!', data) // eslint-disable-line
      resolve()
    })
  })

}

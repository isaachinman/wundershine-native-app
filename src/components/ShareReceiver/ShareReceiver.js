import React from 'react'

import { Linking, Platform } from 'react-native'
import path from 'react-native-path'
import RNFS from 'react-native-fs'
import ShareExtension from 'utils/share-extension'

export default class Share extends React.Component {

  async componentDidMount() {
    try {

      const data = await ShareExtension.data()
      let urlSafeData = JSON.stringify({ data })
      let url = `wundershine://ImageQueue/ShareReceive?shareReceivingImages=${urlSafeData}`

      if (Platform.OS === 'ios') {
        const appGroupPath = await RNFS.pathForGroup('group.com.wundershine')
        const transformedData = []

        await Promise.all(data.map(async (image) => {
          const filename = path.basename(image.value)
          const destination = `${appGroupPath}/${filename}`
          const fileAlreadyExists = await RNFS.exists(destination)

          if (!fileAlreadyExists) {
            await RNFS.copyFile(image.value, destination)
          }

          transformedData.push({
            type: image.type,
            value: destination,
          })
        }))

        urlSafeData = JSON.stringify({ data: transformedData })
        url = `wundershine://ImageQueue/ShareReceive?shareReceivingImages=${urlSafeData}`

        await ShareExtension.openURL(url)
      } else {
        await Linking.openURL(url)
      }

      await ShareExtension.close()
    } catch (e) {
      // Handle ShareExtension error
    }
  }
  render = () => null
}

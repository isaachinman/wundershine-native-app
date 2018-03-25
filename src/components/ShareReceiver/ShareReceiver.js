import React from 'react'

import { Linking, Platform } from 'react-native'
import ShareExtension from 'utils/share-extension'

export default class Share extends React.Component {

  async componentDidMount() {
    try {
      const data = await ShareExtension.data()
      const urlSafeData = JSON.stringify({ data })
      const url = `wundershine://PhotoQueue/ShareReceive?shareReceivingPhotos=${urlSafeData}`

      if (Platform.OS === 'ios') {
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

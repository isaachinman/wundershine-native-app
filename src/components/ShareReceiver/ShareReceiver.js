/**
 * Sample React Native Share Extension
 * @flow
 */

import React from 'react'
import ShareExtension from 'utils/share-extension'

export default class Share extends React.Component {

  async componentDidMount() {
    try {
      const data = await ShareExtension.data()
      const urlSafeData = JSON.stringify({ data })
      await ShareExtension.openURL(`wundershine://PhotoQueue/ShareReceive?shareReceivingPhotos=${urlSafeData}`)
      await ShareExtension.close()
    } catch (e) {
      // Handle ShareExtension error
    }
  }
  render = () => null
}

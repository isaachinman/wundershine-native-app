import React from 'react'
import { createIconSetFromFontello } from 'react-native-vector-icons'
import fontelloConfig from './wundershine-logo-config.json'

const RNVLogo = createIconSetFromFontello(fontelloConfig)

export default class Logo extends React.Component {
  render = () => <RNVLogo {...this.props} />
}

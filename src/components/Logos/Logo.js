import React from 'react'
import PropTypes from 'prop-types'

import { createIconSetFromFontello } from 'react-native-vector-icons'
import fontelloConfig from './wundershine-logo-config.json'

const RNVLogo = createIconSetFromFontello(fontelloConfig)

export default class Logo extends React.Component {
  render = () => {
    const { type } = this.props
    let name = null
    switch (type) {
      case 'text':
        name = 'wundershine_logo_text'
        break
      case 'graphic':
      default:
        name = 'wundershine_logo_graphic'
        break
    }
    return <RNVLogo {...this.props} name={name} />
  }
}

Logo.propTypes = {
  type: PropTypes.string.isRequired,
}

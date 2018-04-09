import React from 'react'
import PropTypes from 'prop-types'

import { screenUtils } from 'utils/nav'

import { Text, View } from 'react-native'

@screenUtils
export default class EditImage extends React.Component {

  static screenTitle = 'Edit image'

  render() {
    return (
      <View>
        <Text>edit image view {this.props.imageID}</Text>
      </View>
    )
  }
}

EditImage.propTypes = {
  imageID: PropTypes.string.isRequired,
}

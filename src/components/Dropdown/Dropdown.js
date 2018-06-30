import React from 'react'

import { Dropdown as RNMaterialDropdown } from 'react-native-material-dropdown'
import { View } from 'react-native'

import { blackSecondary } from 'styles/colours'

export default class Dropdown extends React.Component {
  render() {
    return (
      <View
        style={{
          marginTop: 10,
          marginBottom: 17,
        }}
      >
        <RNMaterialDropdown
          {...this.props}
          defaultValue=' '
          baseColor={blackSecondary}
          inputContainerStyle={{ borderBottomColor: '#C0C0C0' }}
        />
      </View>
    )
  }
}

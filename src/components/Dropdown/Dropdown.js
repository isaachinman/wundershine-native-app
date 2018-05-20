import React from 'react'
import { Dropdown as RNMaterialDropdown } from 'react-native-material-dropdown'
import { blackSecondary } from 'styles/colours'

export default class Dropdown extends React.Component {
  render() {
    return (
      <RNMaterialDropdown
        {...this.props}
        defaultValue=' '
        baseColor={blackSecondary}
        inputContainerStyle={{ borderBottomColor: '#C0C0C0' }}
      />
    )
  }
}

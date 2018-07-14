import React from 'react'
import PropTypes from 'prop-types'

import { systemWeights } from 'react-native-typography'
import { TextInput } from 'react-native-ui-lib'
import { View } from 'react-native'

import { blackSecondary, green, whitePrimary } from 'styles/colours'

const styles = {
  container: {
    marginTop: 5,
    marginBottom: 10,
  },
  textInput: {
    ...systemWeights.regular,
    minHeight: 21,
    marginBottom: 0,
    paddingBottom: 10,
  },
}

export default class Input extends React.Component {

  state = {
    isActive: false,
  }

  setActive = isActive => this.setState({ isActive })
  focus = () => this.input.focus()

  render() {

    const { isActive } = this.state
    const textFieldProps = Object.assign({}, this.props)

    const { keyboardType, theme, value } = textFieldProps

    let textInputStyles = styles.textInput
    let titleColor = blackSecondary
    let selectionColor = green

    if (theme === 'dark') {
      titleColor = whitePrimary
      selectionColor = whitePrimary
      textInputStyles = {
        ...textInputStyles,
        color: whitePrimary,
      }
    }

    if (textFieldProps.maxLength && isActive) {
      textFieldProps.showCharacterCounter = true
    }

    if (!value) {
      textFieldProps.value = null
      textFieldProps.showCharacterCounter = false
    }

    if (keyboardType === 'email-address') {
      textFieldProps.autoCapitalize = 'none'
    }

    return (
      <View style={styles.container}>
        <TextInput
          ref={x => this.input = x}
          underlineColor={{
            default: '#dddddd',
            focus: selectionColor,
          }}
          selectionColor={selectionColor}
          style={textInputStyles}
          titleColor={titleColor}
          autoCorrect={false}
          onFocus={() => this.setActive(true)}
          onBlur={() => this.setActive(false)}
          {...textFieldProps}
        />
      </View>
    )
  }

}

Input.defaultProps = {
  title: null,
}

Input.propTypes = {
  title: PropTypes.string,
}

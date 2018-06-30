import React from 'react'
import PropTypes from 'prop-types'

import { systemWeights } from 'react-native-typography'
import { TextInput } from 'react-native-ui-lib'
import { View } from 'react-native'

import { blackSecondary, green } from 'styles/colours'

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

  render() {

    const { isActive } = this.state
    const textFieldProps = Object.assign({}, this.props)

    const { keyboardType, value } = textFieldProps

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
          underlineColor={{
            default: '#dddddd',
            focus: green,
          }}
          style={styles.textInput}
          titleColor={blackSecondary}
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

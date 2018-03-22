import React from 'react'
import PropTypes from 'prop-types'
import { Button as NativeBaseButton, Text as NativeBaseButtonText, Spinner } from 'native-base'
import { green, red, blackPrimary, whitePrimary, whiteSecondary } from 'styles/colours'

/*

The main purpose of this component is to transform the button text
to uppercase. Unfortunately this must be done manually, as React
Native so far refuses to support textTransform.

https://github.com/facebook/react-native/issues/2088

*/

export default class Button extends React.Component {

  render() {

    const buttonProps = Object.assign({}, this.props)
    if (buttonProps.loading) {
      buttonProps.disabled = true
    }

    const buttonStyles = { ...buttonProps.style }
    const textStyles = {}
    const {
      bordered,
      text,
      info,
      primary,
      danger,
      disabled,
      loading,
    } = this.props

    /* Primary */
    if (primary) {
      buttonStyles.backgroundColor = green
      if (bordered) {
        buttonStyles.backgroundColor = 'transparent'
        buttonStyles.borderColor = green
        textStyles.color = green
      }
    }

    /* Info */
    if (info) {
      textStyles.color = blackPrimary
      buttonStyles.backgroundColor = whiteSecondary
    }

    /* Danger */
    if (danger) {
      textStyles.color = whitePrimary
      buttonStyles.backgroundColor = red
    }

    /* Disabled */
    if (disabled || loading) {
      if (loading) {
        buttonProps.disabled = true
      }
      buttonStyles.backgroundColor = whiteSecondary
    }

    return (
      <NativeBaseButton
        {...buttonProps}
        style={buttonStyles}
      >
        <NativeBaseButtonText style={textStyles}>
          {text.toUpperCase()}
        </NativeBaseButtonText>
        {loading ?
          <Spinner color='white' />
          : null
        }
      </NativeBaseButton>
    )
  }

}

Button.defaultProps = {
  bordered: false,
  danger: false,
  disabled: false,
  info: false,
  loading: false,
  primary: false,
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  bordered: PropTypes.bool,
  danger: PropTypes.bool,
  disabled: PropTypes.bool,
  info: PropTypes.bool,
  loading: PropTypes.bool,
  primary: PropTypes.bool,
}

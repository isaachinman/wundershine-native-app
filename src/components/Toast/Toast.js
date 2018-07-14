import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { Toast as WixToast } from 'react-native-ui-lib'
import { green, red } from 'styles/colours'

@inject('ui')
@observer
export default class Toast extends React.Component {

  render() {

    const { toast } = this.props.ui

    let bgColor = green
    if (toast.type === 'error') {
      bgColor = red
    }

    return (
      <WixToast
        allowDismiss
        visible={toast.visible}
        message={toast.message}
        backgroundColor={bgColor}
        zIndex={99999}
      />
    )
  }

}

Toast.wrappedComponent.propTypes = {
  ui: PropTypes.shape({
    toast: PropTypes.shape({
      visible: PropTypes.bool,
      message: PropTypes.string,
    }),
  }).isRequired,
}

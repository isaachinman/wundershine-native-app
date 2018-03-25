import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Container, Content } from 'native-base'
import { Loader } from 'components'
import { Text } from 'react-native'
import { screenUtils, NavActions } from 'utils/nav'

import styles from './PaymentMethods.styles'

@inject('user')
@screenUtils
@observer
export default class PaymentMethods extends React.Component {

  static screenTitle = 'Payment methods'

  static navigatorButtons = {
    leftButtons: [
      {
        id: 'cancel',
        title: 'Cancel',
      },
    ],
    rightButtons: [
      {
        id: 'save',
        title: 'Save',
      },
    ],
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        NavActions.pop()
      }
      if (event.id === 'save') {
        this.handleSave()
      }
    }
  }

  handleSave = async () => {
    const { user } = this.props
    try {
      await user.updateUser()
      NavActions.pop()
    } catch (error) {
      // Handle update error here
    }
  }

  render() {

    const { user } = this.props

    return (
      <Container>
        <Loader active={user.loading} />
        <Content contentContainerStyle={styles.content}>
          <Text>Payment methods page</Text>
        </Content>
      </Container>
    )
  }
}

PaymentMethods.wrappedComponent.propTypes = {
  navigator: PropTypes.shape({
    setOnNavigatorEvent: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    data: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    updateUser: PropTypes.func.isRequired,
  }).isRequired,
}

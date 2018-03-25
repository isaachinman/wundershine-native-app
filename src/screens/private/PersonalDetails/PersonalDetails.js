import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import { Container, Content } from 'native-base'
import { Input, Loader } from 'components'
import { screenUtils, NavActions } from 'utils/nav'

import styles from './PersonalDetails.styles'

@inject('user')
@screenUtils
@observer
export default class PersonalDetails extends React.Component {

  static screenTitle = 'Personal details'

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
    const { personalDetailsForm, personalDetailsFormIsValid, updateForm } = user

    return (
      <Container>
        <Loader active={user.loading} />
        <Content contentContainerStyle={styles.content}>
          <Input
            title='First name'
            onChangeText={t => updateForm('personalDetails', 'firstName', t)}
            disabled={!personalDetailsFormIsValid}
            value={personalDetailsForm.firstName}
          />
          <Input
            title='Last name'
            onChangeText={t => updateForm('personalDetails', 'lastName', t)}
            value={personalDetailsForm.lastName}
          />
          <Input
            title='Email address'
            onChangeText={t => updateForm('personalDetails', 'email', t)}
            value={personalDetailsForm.email}
            maxLength={100}
          />
        </Content>
      </Container>
    )
  }
}

PersonalDetails.wrappedComponent.propTypes = {
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

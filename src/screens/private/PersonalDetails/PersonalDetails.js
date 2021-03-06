import React from 'react'
import PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

import { Button, Input, Loader } from 'components'
import { Container, Content } from 'native-base'
import { Col, Row } from 'react-native-easy-grid'
import { screenUtils, NavActions } from 'utils/nav'

import styles from './PersonalDetails.styles'

@inject('user')
@screenUtils
@observer
export default class PersonalDetails extends React.Component {

  static screenTitle = 'Personal details'

  handleSave = async () => {
    const { user } = this.props
    try {
      await user.updatePersonalDetails()
      NavActions.pop()
    } catch (error) {
      // Handle update error here
    }
  }

  render() {

    const { user } = this.props
    const { personalDetailsForm, personalDetailsFormIsValid, updateForm } = user

    return (
      <Container style={styles.container}>
        <Loader active={user.loading} />
        <Content contentContainerStyle={styles.content}>
          <Row>
            <Col>
              <Input
                title='First name*'
                onChangeText={t => updateForm('personalDetails', 'firstName', t)}
                value={personalDetailsForm.firstName}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                title='Last name*'
                onChangeText={t => updateForm('personalDetails', 'lastName', t)}
                value={personalDetailsForm.lastName}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                title='Email address*'
                onChangeText={t => updateForm('personalDetails', 'email', t)}
                value={personalDetailsForm.email}
                maxLength={100}
              />
            </Col>
          </Row>
        </Content>
        <Button
          onPress={this.handleSave}
          text='Save'
          disabled={!personalDetailsFormIsValid}
          primary
          full
        />
      </Container>
    )
  }
}

PersonalDetails.wrappedComponent.propTypes = {
  user: PropTypes.shape({
    data: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
    updatePersonalDetails: PropTypes.func.isRequired,
  }).isRequired,
}

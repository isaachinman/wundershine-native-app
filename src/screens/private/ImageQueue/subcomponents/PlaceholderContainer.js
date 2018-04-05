/* eslint-disable react/no-multi-comp */

import React from 'react'
import PropTypes from 'prop-types'

import LinearGradient from 'react-native-linear-gradient'
import { PlaceholderContainer } from 'react-native-loading-placeholder'

class Gradient extends React.PureComponent {
  render() {
    return (
      <LinearGradient
        colors={['#eeeeee', '#dddddd', '#eeeeee']}
        start={{ x: 1.0, y: 0.0 }}
        end={{ x: 0.0, y: 0.0 }}
        style={{
          flex: 1,
          width: 120,
        }}
      />
    )
  }
}

export default class LoadingUI extends React.PureComponent {
  render() {
    return (
      <PlaceholderContainer
        animatedComponent={<Gradient />}
        duration={800}
        delay={200}
        style={{ flex: 1 }}
      >
        {this.props.children}
      </PlaceholderContainer>
    )
  }
}

LoadingUI.propTypes = {
  children: PropTypes.node.isRequired,
}

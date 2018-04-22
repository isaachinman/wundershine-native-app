import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { screenUtils } from 'utils/nav'

import { Icon } from 'components'
import { Image, TouchableOpacity, View } from 'react-native'
import { createResponder } from 'react-native-gesture-responder'

import { SQUARE } from 'utils/images/aspect-ratios'

import methods from './methods'
import styles from './EditImage.styles'

@inject('queue')
@screenUtils
@observer
export default class EditImage extends React.Component {

  static screenTitle = 'Edit image'

  static navigatorButtons = {
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
    Object.keys(methods).forEach((method) => {
      if (typeof methods[method] === 'function') {
        this[method] = methods[method].bind(this)
      }
    })
  }

  componentWillMount = () => {

    // Find master image from queue
    const { _id, queue } = this.props
    this.masterImage = queue.data.images.find(i => i._id === _id)

    // Apply initial transformation
    this.applyTransformation(this.masterImage.transformation)

    // Unlock UI
    this.lockUntil = new Date().getTime()

    // Create gesture responder
    this.gestureResponder = createResponder({
      onStartShouldSetResponder: () => true,
      onStartShouldSetResponderCapture: () => true,
      onMoveShouldSetResponder: () => true,
      onMoveShouldSetResponderCapture: () => true,
      onResponderMove: this.handleResponderMove,
      onResponderRelease: this.handleResponderEnd,
      onResponderTerminate: this.handleResponderEnd,
      moveThreshold: 10,
      minMoveDistance: 10,
    })

  }

  componentDidMount = () => this.updateNativeStyles()

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'save') {
        this.saveTransformation()
      }
    }
  }

  updateNativeStyles = () => {
    if (this.image) {
      this.image.setNativeProps({ ...this.imageStyles, top: this.yShift, left: this.xShift })
    }
  }

  activatePrintBorder = () => {
    if (this.print) {
      if (!this.printBorderActivated) {
        this.print.setNativeProps({
          borderColor: '#eee',
        })
        this.printBorderActivated = true
        setTimeout(() => {
          if (this.printBorderActivated) {
            this.print.setNativeProps({
              borderColor: '#fff',
            })
            this.printBorderActivated = false
          }
        }, 1000)
      }
    }
  }

  lockUI = (lockLength) => {
    const lockUntil = new Date()
    lockUntil.setMilliseconds(lockUntil.getMilliseconds() + lockLength)
    this.lockUntil = lockUntil.getTime()

  }

  handleResponderMove = (e, gestureState) => {
    if (this.lockUntil < new Date().getTime()) {
      if (gestureState.pinch) {
        this.pinching = true
        this.calculateZoom(gestureState)
      } else if (!this.pinching) {
        this.xShift = this.calculateXAxis(this.previousLeft, gestureState.dx)
        this.yShift = this.calculateYAxis(this.previousTop, gestureState.dy)
      }
      this.activatePrintBorder()
      this.updateNativeStyles()
    }
  }

  handleResponderEnd = () => {

    /*
      Gesture responder will seamlessly transition from
      pinch to pan if one finger is lifted. This causes
      unexpected behaviour, so the UI is briefly locked
      after pinch interactions.
    */
    if (this.pinching) {
      this.pinching = false
      this.lockUI(100)
    }
    this.previousLeft = this.xShift
    this.previousTop = this.yShift
    this.transformation = { ...this.getTransformation(), rotation: this.rotation }

  }

  render() {

    return (
      <View style={styles.content}>
        <View style={styles.paper}>
          <View
            ref={p => this.print = p}
            style={styles.print}
          >
            <Image
              {...this.gestureResponder}
              ref={i => this.image = i}
              source={{ uri: this.masterImage.uri }}
              style={{ position: 'relative' }}
            />
          </View>
        </View>
        <View style={styles.iconBar}>

          <TouchableOpacity
            onPress={() => {
              const newTransformation = this.rotate(this.transformation, 90)
              this.applyTransformation(newTransformation)
              this.updateNativeStyles()
            }}
          >
            <Icon name='ios-refresh' style={styles.iconRotateClockwise} />
          </TouchableOpacity>

          {this.layout !== SQUARE &&
            <TouchableOpacity
              onPress={this.toggleFitFill}
            >
              <Icon name='md-expand' style={styles.iconExpand} />
            </TouchableOpacity>
          }

          <TouchableOpacity
            onPress={() => {
              const newTransformation = this.rotate(this.transformation, -90)
              this.applyTransformation(newTransformation)
              this.updateNativeStyles()
            }}
          >
            <Icon name='ios-refresh' style={styles.iconRotateCounterClockwise} />
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}

EditImage.wrappedComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  navigator: PropTypes.shape({
    setOnNavigatorEvent: PropTypes.func.isRequired,
  }).isRequired,
  queue: PropTypes.shape({
    updateImageTransformation: PropTypes.func,
  }).isRequired,
}

import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { screenUtils } from 'utils/nav'

import * as Animatable from 'react-native-animatable'
import { Col, Grid, Row } from 'react-native-easy-grid'
import { createResponder } from 'react-native-gesture-responder'
import { Icon } from 'components'
import { Image, TouchableOpacity, View } from 'react-native'

import { SQUARE } from 'utils/images/aspect-ratios'
import { SQUARE_FRAME_DIMENSION } from './constants'

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
      onResponderGrant: () => this.activatePrintBorder(true),
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
      const { width, height, transform } = this.imageStyles
      this.image.setNativeProps({
        width,
        height,
        transform,
        top: this.yShift,
        left: this.xShift,
      })
      let gridTop = this.yShift < 0 ? 0 : this.yShift
      let gridLeft = this.xShift < 0 ? 0 : this.xShift
      if (this.rotation % 180) {
        gridTop = this.xShift < 0 ? 0 : this.xShift
        gridLeft = this.yShift < 0 ? 0 : this.yShift
      }
      this.gridOverlay.setNativeProps({
        width,
        height,
        transform: [
          { rotate: `${this.rotation}deg` },
        ],
        maxWidth: SQUARE_FRAME_DIMENSION,
        maxHeight: SQUARE_FRAME_DIMENSION,
        top: gridTop,
        left: gridLeft,
      })
    }
  }

  activatePrintBorder = (activeState) => {
    if (this.borderBox && this.gridOverlay) {
      if (activeState) {
        clearTimeout(this.hideGridOverlay)
        if (!this.gridActivated) {
          this.borderBox.fadeIn(100)
          this.gridOverlay.fadeIn(100)
          this.gridActivated = true
        }
      } else if (!activeState && this.gridActivated) {
        this.hideGridOverlay = setTimeout(() => {
          if (this.gridActivated) {
            this.borderBox.fadeOut(700)
            this.gridOverlay.fadeOut(700)
            this.gridActivated = false
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
      this.updateNativeStyles()
    }
  }

  handleResponderEnd = () => {

    this.activatePrintBorder(false)

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
            <Animatable.View
              ref={x => this.borderBox = x}
              style={styles.borderBox}
              pointerEvents='none'
            />
            <Animatable.View
              ref={x => this.gridOverlay = x}
              style={styles.gridOverlay}
              pointerEvents='none'
            >
              <Grid>
                {[1, 2, 3].map(row => (
                  <Row key={`grid-overlay-row-${row}`}>
                    {[1, 2, 3].map(col => (
                      <Col
                        key={`grid-overlay-col-${col}`}
                        style={styles.gridBox}
                      >
                        <View style={styles.gridBlack} />
                      </Col>
                    ))}
                  </Row>
                ))}
              </Grid>
            </Animatable.View>
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
            style={styles.buttonContainer}
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
              style={styles.buttonContainer}
              onPress={this.toggleFitFill}
            >
              <Icon name='md-expand' style={styles.iconExpand} />
            </TouchableOpacity>
          }

          <TouchableOpacity
            style={styles.buttonContainer}
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

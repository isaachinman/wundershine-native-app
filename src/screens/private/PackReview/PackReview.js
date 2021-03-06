import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { Loader } from 'components'
import { screenUtils, NavActions } from 'utils/nav'
import { transformedImageURI } from 'utils/images'

import { ActionBar, Carousel, PageControl } from 'react-native-ui-lib'
import { Image, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import { blackTertiary } from 'styles/colours'

import squareFrameReviewImage from 'images/square_frame_review.png'

import { SQUARE_REVIEW_PRINT_DIMENSION } from './constants'
import styles from './PackReview.styles'

@inject('cart', 'queue', 'ui')
@screenUtils
@observer
export default class PackReview extends React.Component {

  static screenTitle = 'Review'

  static navigatorButtons = {
    leftButtons: [
      {
        id: 'back',
        title: 'Back',
      },
    ],
  }

  constructor(props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }

  state = {
    page: 0,
  }

  componentWillMount() { NavActions.setDrawerEnabled({ side: 'left', enabled: false }) }
  componentWillUnmount() { NavActions.setDrawerEnabled({ side: 'left', enabled: true }) }

  onNavigatorEvent = (event) => {
    const { ui } = this.props
    if (event.id === 'willAppear' && ui.forceRefreshScreens.includes('PackReview')) {
      ui.setForceRefreshScreen('PackReview', false)
      this.forceUpdate()
    }
    if (event.type === 'NavBarButtonPress' && event.id === 'back') {
      NavActions.dismissModal()
    }
  }

  changePage = page => this.setState({ page })

  redirectToEditScreen = (imageID) => {
    NavActions.showModal({
      screen: 'EditImage',
      passProps: { _id: imageID, withinReview: true },
      navigatorButtons: {
        leftButtons: [{
          id: 'back',
          title: 'Back',
        }],
        rightButtons: [{
          id: 'save',
          title: 'Save',
        }],
      },
    })
  }

  goToCart = () => {
    setTimeout(() => {
      NavActions.push({ screen: 'Cart' })
      NavActions.dismissModal()
    }, 10)
  }

  render() {

    const { cart, queue } = this.props
    const { page } = this.state
    const selectedImages = queue.data.images.filter(i => i.selected)

    return (
      <View style={styles.container}>
        <Loader active={cart.loading} />
        <View
          style={styles.content}
        >
          <Carousel
            onChangePage={this.changePage}
          >
            {selectedImages.map((image) => {

              const { transformation } = image

              const WIDTH_OF_SELECTION = transformation.rightBoundary - transformation.leftBoundary
              const HEIGHT_OF_SELECTION = transformation.bottomBoundary - transformation.topBoundary
              const SCALE = WIDTH_OF_SELECTION / SQUARE_REVIEW_PRINT_DIMENSION
              const WIDTH_OF_THUMBNAIL = Math.round(WIDTH_OF_SELECTION / SCALE) * 2
              const HEIGHT_OF_THUMBNAIL = Math.round(HEIGHT_OF_SELECTION / SCALE) * 2
              const uri = transformedImageURI(image, {
                thumbnail: true,
                thumbnailWidth: WIDTH_OF_THUMBNAIL,
                thumbnailHeight: HEIGHT_OF_THUMBNAIL,
              })

              return (
                <View key={image._id}>
                  <TouchableWithoutFeedback
                    onPress={() => this.redirectToEditScreen(image._id)}
                  >
                    <View>
                      <View style={styles.frameContainer}>
                        <Image
                          source={squareFrameReviewImage}
                          style={styles.frame}
                        />
                      </View>
                      <View style={styles.print}>
                        <FastImage
                          style={styles.ink}
                          resizeMode={FastImage.resizeMode.contain}
                          source={{ uri }}
                        />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )
            })}
          </Carousel>
        </View>
        <View style={styles.pageControlContainer}>
          <PageControl
            numOfPages={selectedImages.length}
            currentPage={page}
            color={blackTertiary}
          />
        </View>
        <ActionBar
          height={60}
          actions={[
            {
              label: 'CROP',
              labelStyle: styles.actionBarLabel,
              onPress: () => this.redirectToEditScreen(selectedImages[page]._id),
            },
            {
              label: 'CONFIRM ALL',
              labelStyle: styles.actionBarLabel,
              onPress: async () => {
                await cart.createPrintPack()
                await queue.getQueue()
                this.goToCart()
              },
            },
          ]}
        />
      </View>
    )
  }
}

PackReview.wrappedComponent.propTypes = {
  cart: PropTypes.shape({
    createPrintPack: PropTypes.func.isRequired,
  }).isRequired,
  navigator: PropTypes.shape({
    setOnNavigatorEvent: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
  }).isRequired,
  queue: PropTypes.shape({
    data: PropTypes.shape({
      queueType: PropTypes.string,
    }),
  }).isRequired,
  ui: PropTypes.shape({
    setForceRefreshScreen: PropTypes.func.isRequired,
  }).isRequired,
}

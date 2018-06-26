import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { Loader } from 'components'
import { screenUtils, NavActions } from 'utils/nav'
import { transformedImageURI } from 'utils/images'

import { ActionBar, AnimatedImage, Carousel, PageControl } from 'react-native-ui-lib'
import { ActivityIndicator, Image, TouchableWithoutFeedback, View } from 'react-native'

import { blackTertiary, whiteSecondary } from 'styles/colours'

import squareFrameReviewImage from 'images/square_frame_review.png'

import { SQUARE_REVIEW_PRINT_DIMENSION } from './constants'
import styles from './PackReview.styles'

@inject('cart', 'queue', 'ui')
@screenUtils
@observer
export default class EditImage extends React.Component {

  static screenTitle = 'Review pack'

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
              const uri = transformedImageURI(image, {
                thumbnail: true,
                thumbnailWidth: SQUARE_REVIEW_PRINT_DIMENSION * 2,
                thumbnailHeight: SQUARE_REVIEW_PRINT_DIMENSION * 2,
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
                      <AnimatedImage
                        key={`pack-review-${uri}`}
                        containerStyle={styles.print}
                        imageStyle={styles.ink}
                        imageSource={{ uri }}
                        loader={<ActivityIndicator color={whiteSecondary} />}
                        animationDuration={200}
                      />
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
          actions={[
            {
              label: 'Crop',
              onPress: () => this.redirectToEditScreen(selectedImages[page]._id),
            },
            {
              label: 'Confirm all',
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

EditImage.wrappedComponent.propTypes = {
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

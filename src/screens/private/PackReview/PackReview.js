import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { Loader } from 'components'
import { screenUtils, NavActions } from 'utils/nav'
import { transformedImageURI } from 'utils/images'

import { ActionBar, AnimatedImage, Carousel, PageControl } from 'react-native-ui-lib'
import { ActivityIndicator, Image, View } from 'react-native'

import { blackTertiary, whiteSecondary } from 'styles/colours'

import squareFrameReviewImage from 'images/square_frame_review.png'
import styles from './PackReview.styles'

@inject('cart', 'queue', 'ui')
@screenUtils
@observer
export default class EditImage extends React.Component {

  static screenTitle = 'Review pack'

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
  }

  changePage = page => this.setState({ page })

  redirectToEditScreen = (imageID) => {
    NavActions.push({ screen: 'EditImage', passProps: { _id: imageID, withinReview: true } })
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
              const uri = transformedImageURI(image)
              return (
                <View key={image._id}>
                  <View style={styles.frameContainer}>
                    <Image
                      source={squareFrameReviewImage}
                      style={styles.frame}
                    />
                  </View>
                  <AnimatedImage
                    key={`pack-review-${uri}`}
                    containerStyle={styles.print}
                    imageStyle={{ flex: 1 }}
                    imageSource={{ uri }}
                    loader={<ActivityIndicator color={whiteSecondary} />}
                    animationDuration={200}
                  />
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
                NavActions.resetTo({ screen: 'Cart' })
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

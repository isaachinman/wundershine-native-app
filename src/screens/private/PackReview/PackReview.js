import React from 'react'
import PropTypes from 'prop-types'

import { inject, observer } from 'mobx-react'
import { screenUtils, NavActions } from 'utils/nav'
import { transformedImageURI } from 'utils/images'

import { ActionBar, Carousel, PageControl } from 'react-native-ui-lib'
import { Image, View } from 'react-native'

import { blackTertiary } from 'styles/colours'
// import { SQUARE } from 'utils/images/aspect-ratios'
// import { SQUARE_FRAME_DIMENSION } from './constants'

import squareFrameReviewImage from 'images/square_frame_review.png'

import styles from './PackReview.styles'

@inject('cart', 'queue')
@screenUtils
@observer
export default class EditImage extends React.Component {

  static screenTitle = 'Review pack'

  state = {
    page: 0,
  }

  componentWillMount = () => NavActions.setDrawerEnabled({ side: 'left', enabled: false })
  componentWillUnmount = () => NavActions.setDrawerEnabled({ side: 'left', enabled: true })

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
        <View
          style={styles.content}
        >
          <Carousel
            onChangePage={this.changePage}
          >
            {selectedImages.map(image => (
              <View key={image._id}>
                <View style={styles.frameContainer}>
                  <Image
                    source={squareFrameReviewImage}
                    style={styles.frame}
                  />
                </View>
                <Image
                  source={{ uri: transformedImageURI(image) }}
                  style={styles.print}
                />
              </View>
            ))}
          </Carousel>
          <View style={styles.pageControlContainer}>
            <PageControl
              numOfPages={selectedImages.length}
              currentPage={page}
              color={blackTertiary}
            />
          </View>
        </View>
        <ActionBar
          actions={[
            {
              label: 'Crop',
              onPress: () => this.redirectToEditScreen(selectedImages[page]._id),
            },
            {
              label: 'Confirm all',
              onPress: cart.createPrintPack,
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
  queue: PropTypes.shape({
    data: PropTypes.shape({
      queueType: PropTypes.string,
    }),
  }).isRequired,
}

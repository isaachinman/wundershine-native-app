import FastImage from 'react-native-fast-image'
import { NavActions } from 'utils/nav'
import { calculateThumbnail } from 'screens/private/ImageQueue/subcomponents/QueueItem'

export default async function () {

  const { _id, queue } = this.props

  try {

    const transformation = this.getTransformation()

    // Preload new images (assumes save success)
    FastImage.preload([{
      uri: calculateThumbnail({ ...this.masterImage, transformation }),
      priority: FastImage.priority.high,
    }])

    await queue.updateImageTransformation(_id, transformation)

    if (this.props.withinReview) {
      // Unfortunate hack for the time being
      // https://github.com/wix/react-native-navigation/issues/2815
      setTimeout(() => {
        // this.props.ui.setForceRefreshScreen('PackReview', true)
        NavActions.dismissModal()
      }, 10)
    } else {
      NavActions.popToRoot()
    }

  } catch (error) {
    // Handle error
  }

}

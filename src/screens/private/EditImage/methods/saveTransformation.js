import { NavActions } from 'utils/nav'

export default async function () {

  const { _id, queue } = this.props

  try {
    await queue.updateImageTransformation(_id, this.getTransformation())

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

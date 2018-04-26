import { NavActions } from 'utils/nav'

export default async function () {

  const { _id, queue } = this.props

  try {
    await queue.updateImageTransformation(_id, {
      ...this.getTransformation(), rotation: this.rotation,
    })

    if (this.props.withinReview) {
      this.props.ui.setForceRefreshScreen('PackReview', true)
      NavActions.pop()
    } else {
      NavActions.push({ screen: 'ImageQueue' })
    }

  } catch (error) {
    // Handle error
  }

}

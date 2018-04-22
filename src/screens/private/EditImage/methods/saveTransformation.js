import { NavActions } from 'utils/nav'

export default async function () {

  const { _id, queue } = this.props

  try {
    await queue.updateImageTransformation(_id, {
      ...this.getTransformation(), rotation: this.rotation,
    })
    NavActions.push({ screen: 'ImageQueue' })
  } catch (error) {
    // Handle error
  }

}

import { action, observable } from 'mobx'
import { apiRequest } from 'utils/api'

import QueueStore from './QueueStore'

class CartStore {

  @observable
  cart = []

  @action
  createPrintPack = async () => {

    const { queueType, data } = QueueStore
    const images = data.images.filter(i => i.selected).map(i => i._id)

    try {
      const res = await apiRequest({ // eslint-disable-line
        url: '/pv/printpack/create',
        data: { queueType, images },
      })
    } catch (error) {
      // Throw error back to EditImage screen
      throw error
    }
  }

}

export default new CartStore()

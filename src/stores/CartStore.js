import { action, runInAction, observable } from 'mobx'
import { apiRequest } from 'utils/api'

import QueueStore from './QueueStore'

class CartStore {

  @action
  async setup() {
    await this.getCart()
  }

  @observable
  data = {
    items: [],
  }

  @observable
  loading = false

  @action
  setLoading = bool => this.loading = bool

  @action
  getCart = async () => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ url: '/pv/cart' })
      runInAction(() => this.data = res.data)
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.setLoading(false)
  }

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

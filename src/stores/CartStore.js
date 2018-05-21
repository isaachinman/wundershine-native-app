import { action, computed, runInAction, observable } from 'mobx'
import { apiRequest } from 'utils/api'

import QueueStore from './QueueStore'
import UserStore from './UserStore'

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
  paymentMethodChosen = {
    type: null,
    id: null,
  }

  @observable
  loading = false

  @action
  setLoading = bool => this.loading = bool

  @computed
  get paymentMethodIsValid() {
    if (this.paymentMethodChosen.type === 'ideal') {
      return true
    } else if (this.paymentMethodChosen.type === 'cc' && typeof this.paymentMethodChosen.id === 'string') {
      return true
    }
    return false
  }

  @action
  setDefaultPaymentMethod = () => {
    const { paymentMethods } = UserStore.data

    // Only set default payment method if user has not made a selection
    if (this.paymentMethodChosen.type === null) {
      if (paymentMethods.creditCards.length > 0) {
        this.paymentMethodChosen = {
          type: 'cc',
          id: paymentMethods.creditCards[0]._id,
        }
      }
    }
  }

  @action
  setPaymentMethod = (type, id = null) => this.paymentMethodChosen = { type, id }

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
    this.setLoading(true)
    const { queueType, data } = QueueStore
    const images = data.images.filter(i => i.selected).map(i => i._id)

    try {
      const res = await apiRequest({
        url: '/pv/printpack/create',
        data: { queueType, images },
      })
      runInAction(() => this.data = res.data.cart)
    } catch (error) {
      // Throw error back to EditImage screen
      throw error
    }
    this.setLoading(false)
  }

  @action
  dissolvePrintpacks = async (printpackIDs) => {
    this.setLoading(true)
    try {

      // Delete pack
      const res = await apiRequest({ url: '/pv/printpack/delete', data: { printpackIDs } })
      runInAction(() => this.data = res.data.cart)
      QueueStore.mergeIntoLocalData(res.data.queues[QueueStore.queueType], true)

    } catch (error) {
      // Throw error back to EditImage screen
      throw error
    }
    this.setLoading(false)
  }

  @action
  changeItemQuantity = async (itemID, quantity) => {
    this.setLoading(true)
    try {
      const res = await apiRequest({
        url: `/pv/cart/change-quantity/${itemID}`,
        data: { quantity },
      })
      runInAction(() => this.data = res.data)
    } catch (error) {
      // Handle error
    }
    this.setLoading(false)
  }

}

export default new CartStore()

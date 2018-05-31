import { action, computed, runInAction, observable } from 'mobx'
import { apiRequest } from 'utils/api'

import * as modelActions from 'models'

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
  discountCodeForm = modelActions.createDiscountCodeForm()

  @observable
  discountCodeError = null

  @computed
  get discountCodeFormIsValid() {
    return modelActions.validateDiscountCodeForm(this.discountCodeForm)
  }

  @observable
  loading = false

  @action
  setLoading = bool => this.loading = bool

  @action
  updateForm = (form, field, value) => this[`${form}Form`][field] = value

  @action
  clearForm = form => Object.keys(this[`${form}Form`]).forEach(v => this[`${form}Form`][v] = null)

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

  @action
  applyDiscount = async () => {
    this.setLoading(true)
    try {
      const res = await apiRequest({
        url: '/pv/cart/apply-discount',
        data: { discountCode: this.discountCodeForm.discountCode },
      })
      runInAction(() => this.data = res.data)
    } catch (error) {
      // Handle error
      if (error.response && error.response.data && error.response.data.error) {
        runInAction(() => {
          this.discountCodeError = error.response.data.error
        })
      }
    }
    this.setLoading(false)
  }

  @action
  removeDiscount = async () => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ url: '/pv/cart/remove-discount', method: 'POST' })
      runInAction(() => this.data = res.data)
    } catch (error) {
      // Handle error
    }
    this.setLoading(false)
  }

}

export default new CartStore()

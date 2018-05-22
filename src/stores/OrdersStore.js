import { action, runInAction, observable } from 'mobx'
import { apiRequest } from 'utils/api'

class OrdersStore {

  @action
  async setup() {
    await this.getOrders()
  }

  @observable
  data = new Map()

  @observable
  loading = false

  @observable
  error = null

  @action
  mergeIntoLocalData = orders => orders.forEach(order => this.data.set(order._id, order))

  @action
  setLoading = bool => this.loading = bool

  @action
  createOrder = async (cartID, addressID, paymentMethodChosen) => {
    this.setLoading(true)
    try {
      const res = await apiRequest({
        url: '/pv/orders/create',
        data: { cartID, addressID, paymentMethodChosen },
      })
      const pendingOrder = res.data
      this.mergeIntoLocalData([pendingOrder])
      this.setLoading(false)
      return pendingOrder
    } catch (error) {
      // Handle error
      this.setLoading(false)
      throw error
    }
  }

  @action
  getOrders = async () => {
    try {
      const res = await apiRequest({ url: '/pv/orders' })
      this.mergeIntoLocalData(res.data)
    } catch (error) {
      runInAction(() => this.error = error)
    }
  }

  @action
  getOrder = async (orderID) => {
    try {
      const res = await apiRequest({ url: `/pv/orders/${orderID}` })
      this.mergeIntoLocalData([res.data])
    } catch (error) {
      runInAction(() => this.error = error)
    }
  }

  @action
  pollOrderUntilNotPending = async (orderID) => {
    try {
      const poll = setInterval(async () => {
        await this.getOrder(orderID)
        const order = this.data.get(orderID)
        if (order.status !== 'pending') {
          clearInterval(poll)
        }
      }, 2000)
    } catch (error) {
      runInAction(() => this.error = error)
    }
  }

}

export default new OrdersStore()

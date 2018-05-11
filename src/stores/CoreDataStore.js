import { action, runInAction, observable } from 'mobx'
import { apiRequest } from 'utils/api'

class CoreDataStore {

  @action
  async setup() {
    await this.getData()
  }

  @observable
  products = {}

  @observable
  settings = {}

  @action
  getData = async () => {
    try {
      const res = await apiRequest({ url: '/pb/core-data' })
      const { products, settings } = res.data
      runInAction(() => {
        this.products = products
        this.settings = settings
      })
    } catch (error) {
      runInAction(() => this.error = error)
    }
  }

}

export default new CoreDataStore()

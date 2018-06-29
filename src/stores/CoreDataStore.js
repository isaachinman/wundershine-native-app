import { observable } from 'mobx'

import coreData from 'core-data.json'

class CoreDataStore {

  @observable
  products = coreData.products

  @observable
  settings = coreData.settings

}

export default new CoreDataStore()

import { action, observable } from 'mobx'
import { wundershineProducts } from 'data'

export default class CartStore {

  @observable
  sku = wundershineProducts.SQPK05.sku

  @action
  changeSKU = sku => this.sku = sku

}

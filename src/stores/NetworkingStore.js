import { action, autorun, observable } from 'mobx'
import toast from 'utils/toast'

export default class NetworkingStore {

  constructor() {
    autorun(() => {
      if (!this.hasNetworkConnection && !this.notifiedOfOfflineStatus) {
        toast('You appear to be offline.')
        this.setNotifiedOfOfflineStatus(true)
      } else if (this.hasNetworkConnection && this.notifiedOfOfflineStatus) {
        this.setNotifiedOfOfflineStatus(false)
      }
    })
  }

  @observable
  hasNetworkConnection = true

  notifiedOfOfflineStatus = false

  @action
  setHasNetworkConnection = bool => this.hasNetworkConnection = bool

  @action
  setNotifiedOfOfflineStatus = bool => this.notifiedOfOfflineStatus = bool

}

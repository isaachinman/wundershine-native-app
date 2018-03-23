import { action, observable } from 'mobx'

class InitialisationStore {

  @observable
  appIsInitialised = false

  @action
  setStatus = bool => this.appIsInitialised = bool

}

export default new InitialisationStore()

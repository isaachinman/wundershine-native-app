import { action, observable } from 'mobx'

export default class InitialisationStore {

  @observable
  appIsInitialised = false

  @action
  setStatus = bool => this.appIsInitialised = bool

}

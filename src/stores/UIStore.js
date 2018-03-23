import { action, runInAction, observable } from 'mobx'

class UIStore {

  @observable
  modals = {
    packSelection: {
      open: false,
    },
  }

  @observable
  toast = {
    visible: false,
    message: null,

    // One of: normal, error
    type: 'normal',
  }

  @action
  triggerToast = (options) => {
    const { message, autoDismiss, type } = options
    this.toast.visible = true
    this.toast.message = message
    this.toast.type = type
    if (autoDismiss) {
      setTimeout(() => {
        runInAction(() => this.toast.visible = false)
      }, 4000)
    }
  }

  @action
  dismissToast = () => this.toast.visible = false

  @action
  toggleModal = (modalName, openState) => this.modals[modalName].open = openState

}

export default new UIStore()

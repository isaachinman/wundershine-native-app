import { Keyboard } from 'react-native'

class NavigationActionsClass {

  setNavigator(navigator) {
    this.navigator = navigator
  }

  onNavigateExtras() {
    Keyboard.dismiss()
  }

  push = params => this.navigator && this.navigator.push(params)
  pop = params => this.navigator && this.navigator.pop(params)
  popToRoot = params => this.navigator && this.navigator.popToRoot(params)
  resetTo = params => this.navigator && (() => {
    this.onNavigateExtras()
    this.navigator.resetTo(params)
  })()
  toggleDrawer = params => this.navigator && this.navigator.toggleDrawer(params)
  toggleNavBar = params => this.navigator && this.navigator.toggleNavBar(params)
  setTitle = params => this.navigator && this.navigator.setTitle(params)
  setDrawerEnabled = params => this.navigator && this.navigator.setDrawerEnabled(params)

  showModal = params => this.navigator && this.navigator.showModal(params)
  dismissModal = () => this.navigator && this.navigator.dismissModal()

  setOnNavigatorEvent = func => this.navigator && this.navigator.setOnNavigatorEvent(func)
}

export default new NavigationActionsClass()

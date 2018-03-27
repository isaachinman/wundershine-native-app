class NavigationActionsClass {

  setNavigator(navigator) {
    this.navigator = navigator
  }

  push = params => this.navigator && this.navigator.push(params)
  pop = params => this.navigator && this.navigator.pop(params)
  resetTo = params => this.navigator && this.navigator.resetTo(params)
  toggleDrawer = params => this.navigator && this.navigator.toggleDrawer(params)
  toggleNavBar = params => this.navigator && this.navigator.toggleNavBar(params)
  setTitle = params => this.navigator && this.navigator.setTitle(params)
  setDrawerEnabled = params => this.navigator && this.navigator.setDrawerEnabled(params)

  setOnNavigatorEvent = func => this.navigator && this.navigator.setOnNavigatorEvent(func)
}

export default new NavigationActionsClass()
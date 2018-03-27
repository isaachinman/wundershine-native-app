import config from 'config'
import { action, runInAction, observable } from 'mobx'
import { NavActions } from 'utils/nav'
import toast from 'utils/toast'
import { Screens, PublicScreens, PrivateScreens } from 'screens'
import qs from 'qs'

import AuthStore from 'stores/AuthStore'
import QueueStore from 'stores/QueueStore'

class RoutingStore {

  @observable
  url = null

  @observable
  params = {}

  @action
  setUrl = async (url) => {
    if (!url || typeof url !== 'string') {
      return
    }
    const data = url.replace(config.DEEP_LINK_ROOT, '').split('?')
    const urlBase = data[0].split('/')[0]
    const urlQuery = data[1]
    if (urlQuery) {
      const params = qs.parse(urlQuery, { ignoreQueryPrefix: true })

      // If inside a share-receiving redirect, set images to upload
      if (params.shareReceivingImages) {
        QueueStore.addImagesToUpload(JSON.parse(params.shareReceivingImages).data)
      }

      runInAction(() => {
        this.url = url
        this.params = params
      })
    }

    // Check if route matches screen
    if (Screens.get(urlBase)) {

      // If screen is public, simply redirect
      if (PublicScreens.get(urlBase)) {
        NavActions.push({ screen: urlBase, animated: false })

      // If screen is private, check auth
      } else if (PrivateScreens.get(urlBase) && AuthStore.loggedIn) {
        NavActions.push({ screen: urlBase, animated: false })

      // If screen is private and user is logged out, redirect to login and show feedback
      } else if (PrivateScreens.get(urlBase) && !AuthStore.loggedIn) {
        NavActions.push({ screen: 'Login', animated: false })
        toast({ message: 'Please log in to continue' })
      }

    }
  }

}

export default new RoutingStore()

import config from 'config'
import { action, runInAction, observable } from 'mobx'
import { NavActions } from 'utils/nav'
import { Screens } from 'screens'
import qs from 'qs'

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

      // If inside a share-receiving redirect, set photos to upload
      if (params.shareReceivingPhotos) {
        QueueStore.addPhotosToUpload(JSON.parse(params.shareReceivingPhotos).data)
      }

      runInAction(() => {
        this.url = url
        this.params = params
      })
    }
    if (Screens.get(urlBase)) {
      NavActions.push({ screen: urlBase })
    }
  }

}

export default new RoutingStore()

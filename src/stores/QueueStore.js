import { action, toJS, runInAction, observable } from 'mobx'
import { apiRequest, uploadImage } from 'utils/api'
import uuid from 'uuid/v1'
import { validateImages } from 'utils/images'
import path from 'react-native-path'

import UIStore from './UIStore'

class QueueStore {

  @action
  async setup() {
    await this.getQueue()
  }

  @observable
  data = []

  @observable
  error = null

  @observable
  imagesToUpload = []

  @observable
  loading = false

  @observable
  currentlyUploading = false

  @action
  setLoading = bool => this.loading = bool

  @action
  getQueue = async () => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ url: '/pv/queue/square' })
      const { data } = res
      runInAction(() => {
        this.data = data
      })
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.setLoading(false)
  }

  @action
  addImagesToUpload = async (images) => {

    const { rejectedImages, validatedImages } = await validateImages(images)

    if (rejectedImages.length > 0) {
      UIStore.toggleModal('imageRejected', true)
    }

    if (validatedImages.length > 0) {
      const newImages = validatedImages.map(image => ({
        _id: uuid(), // Temporary ID until server response
        name: path.basename(image.value),
        origin: 'Need to determine origin',
        uri: image.value,
        type: image.type,
        notUploadedYet: true,
        uriIsLocal: true,
      }))

      runInAction(() => {
        this.imagesToUpload = [...this.imagesToUpload, ...newImages]
        this.data = [...this.data, ...newImages]
      })
    }

  }

  @action
  uploadImage = async () => {
    if (this.imagesToUpload.length < 1) {
      throw new Error('There are no images queued for upload.')
    }

    runInAction(() => this.currentlyUploading = true)
    const image = this.imagesToUpload[0]

    try {

      await uploadImage(toJS(image))

      runInAction(() => {
        this.imagesToUpload = this.imagesToUpload.filter(i => i._id !== image._id)
        this.data = this.data.map((i) => {
          if (i._id === image._id) {
            return {
              ...i,
              notUploadedYet: false,
            }
          }
          return i
        })
        this.currentlyUploading = false
      })

    } catch (error) {
      runInAction(() => {
        this.imagesToUpload = this.imagesToUpload.filter(i => i._id !== image._id)
        this.data = this.data.filter(i => i._id !== image._id)
        this.currentlyUploading = false
      })
    }

  }

}

export default new QueueStore()

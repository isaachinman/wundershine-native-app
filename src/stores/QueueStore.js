import { action, toJS, runInAction, observable } from 'mobx'
import { apiRequest, uploadImage } from 'utils/api'
import uuid from 'uuid/v1'
import { validateImages } from 'utils/images'
import path from 'react-native-path'

import UIStore from './UIStore'

class QueueStore {

  queueType = 'square'

  @action
  async setup() {
    await this.getQueue()
  }

  @observable
  data = {
    [this.queueType]: {
      packSelected: null,
      images: [],
    },
  }

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
      const res = await apiRequest({ url: `/pv/queue/${this.queueType}` })
      const { data } = res
      runInAction(() => {
        this.data[this.queueType] = data
      })
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.setLoading(false)
  }

  @action
  addImagesToUpload = async (images) => {

    const { rejectedImages, validatedImages } = await validateImages(images, this.queueType)

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
        this.data[this.queueType].images = [...this.data[this.queueType].images, ...newImages]
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

      await uploadImage(toJS(image), this.queueType)

      runInAction(() => {
        this.imagesToUpload = this.imagesToUpload.filter(i => i._id !== image._id)
        this.data[this.queueType].images = this.data[this.queueType].images.map((i) => {
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
        this.data[this.queueType].images = this.data[this.queueType].images
          .filter(i => i._id !== image._id)
        this.currentlyUploading = false
      })
    }
  }

  @action
  deleteImage = async (imageID) => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ method: 'DELETE', url: `/pv/queue/${this.queueType}/images/${imageID}` })
      const { data } = res
      runInAction(() => {
        this.data[this.queueType] = data
      })
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.setLoading(false)
  }

  @action
  changePack = async (sku) => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ url: `/pv/queue/${this.queueType}/change-pack`, data: { sku } })
      const { data } = res
      runInAction(() => {
        this.data[this.queueType] = data
      })
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.setLoading(false)
  }

}

export default new QueueStore()

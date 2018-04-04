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
  imagesLoading = []

  @observable
  currentlyUploading = false

  @action setImageLoading = imageID => this.imagesLoading.push(imageID)
  @action removeImageLoading = imageID =>
    this.imagesLoading = this.imagesLoading.filter(i => i._id !== imageID)

  @action
  mergeIntoLocalData = (data) => {
    this.data[this.queueType] = {
      packSelected: data.packSelected,
      images: [
        ...data.selectedImages.map(x => ({ ...x, selected: true })),
        ...data.deselectedImages.map(x => ({ ...x, selected: false })),
      ],
    }
  }

  @action
  getQueue = async () => {
    try {
      const res = await apiRequest({ url: `/pv/queue/${this.queueType}` })
      const { data } = res
      this.mergeIntoLocalData(data)
    } catch (error) {
      runInAction(() => this.error = error)
    }
  }

  @action
  addImagesToUpload = async (images) => {

    const { rejectedImages, validatedImages } = await validateImages(images, this.queueType)

    if (rejectedImages.length > 0) {
      UIStore.toggleModal('imageRejected', true)
    }

    if (validatedImages.length > 0) {
      const newImages = validatedImages.map(image => ({
        localID: uuid(), // Temporary ID until server response
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

      const creationData = await uploadImage(toJS(image), this.queueType)

      runInAction(() => {
        this.imagesToUpload = this.imagesToUpload.filter(i => i._id !== image._id)

        // On complete, swap image data for server response,
        // except for local uri (prevent flicker)
        this.data[this.queueType].images = this.data[this.queueType].images.map((i) => {
          if (i._id === image._id) {
            return {
              ...creationData.image,
              selected: creationData.selected,
              uriIsLocal: true,
              uri: image.uri,
              localID: image.localID,
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
    this.setImageLoading(imageID)
    try {
      const res = await apiRequest({ method: 'DELETE', url: `/pv/queue/${this.queueType}/images/${imageID}` })
      const { data } = res
      this.mergeIntoLocalData(data)
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.removeImageLoading(imageID)
  }

  @action
  changePack = async (sku) => {
    try {
      const res = await apiRequest({ url: `/pv/queue/${this.queueType}/change-pack`, data: { sku } })
      const { data } = res
      this.mergeIntoLocalData(data)
    } catch (error) {
      runInAction(() => this.error = error)
    }
  }

  @action
  selectImage = async (imageID) => {
    this.setImageLoading(imageID)
    try {
      const res = await apiRequest({ url: `/pv/queue/${this.queueType}/images/select`, data: { imageID } })
      const { data } = res
      this.mergeIntoLocalData(data)
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.removeImageLoading(imageID)
  }

}

export default new QueueStore()

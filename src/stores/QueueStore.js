import { action, computed, toJS, runInAction, observable } from 'mobx'
import { apiRequest, uploadImage } from 'utils/api'
import FastImage from 'react-native-fast-image'
import { LayoutAnimation } from 'react-native'
import uuid from 'uuid/v1'
import { prefetchArray, validateImages } from 'utils/images'

import CoreDataStore from './CoreDataStore'
import UIStore from './UIStore'

class QueueStore {

  queueType = 'square'

  @action
  async setup() {
    await this.getQueue()
  }

  @observable
  data = {
    packSelected: null,
    images: [],
  }

  @observable
  error = null

  @observable
  imagesToUpload = []

  @observable
  imagesLoading = []

  @observable
  currentlyUploading = false

  @observable
  refreshing = false

  @computed
  get selectionActionsAllowed() {
    if (this.data.packSelected) {
      const packMinimum = CoreDataStore.products[this.data.packSelected].imageQuantity
      return this.data.images.length > packMinimum
    }
    return false
  }

  @action
  setImageLoading = imageID => this.imagesLoading.push(imageID)
  @action
  removeImageLoading = imageID =>
    this.imagesLoading = this.imagesLoading.filter(i => i !== imageID)

  @action
  setRefreshing = bool => this.refreshing = bool

  preserveLocalIDs = arrayOfImages => arrayOfImages.map((image) => {
    const imageHasPreviousLocalCopy = this.data.images.find(i =>
      i._id === image._id && typeof i.localID === 'string')
    if (imageHasPreviousLocalCopy) {
      return {
        ...image,
        localID: imageHasPreviousLocalCopy.localID,
      }
    }
    return image
  })

  @action
  mergeIntoLocalData = (data, animate = false, animateDuration = 200) => {
    if (animate) {
      LayoutAnimation.configureNext({
        duration: animateDuration,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: { type: LayoutAnimation.Types.easeInEaseOut },
      })
    }
    this.data = {
      packSelected: data.packSelected,
      images: [
        ...this.preserveLocalIDs(data.selectedImages.map(x => ({ ...x, selected: true }))),
        ...this.preserveLocalIDs(data.deselectedImages.map(x => ({ ...x, selected: false }))),
        ...this.imagesToUpload,
      ],
    }
  }

  @action
  getQueue = async () => {
    try {
      const res = await apiRequest({ url: `/pv/queue/${this.queueType}` })
      const { data } = res
      this.mergeIntoLocalData(data, true)
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
        ...image,
        // Temporary ID until server response
        localID: uuid(),
        notUploadedYet: true,
        uriIsLocal: true,
        localURI: image.uri,
        selected: false,
        // Metadata is determined by Cloudinary
        metaData: {},
      }))

      runInAction(() => {
        this.imagesToUpload = [...this.imagesToUpload, ...newImages]
        this.data.images = [...this.data.images, ...newImages]
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

      // Preload images
      FastImage.preload(prefetchArray(creationData.image))

      runInAction(() => {
        this.imagesToUpload = this.imagesToUpload.filter(i => i.localID !== image.localID)

        // On complete, swap image data for server response
        this.data.images = this.data.images.map((i) => {
          if (i.localID === image.localID) {
            return {
              ...creationData.image,
              selected: creationData.selected,
              localID: image.localID,
              localURI: image.localURI,
            }
          }
          return i
        })
        this.currentlyUploading = false
      })

    } catch (error) {
      runInAction(() => {
        this.imagesToUpload = this.imagesToUpload.filter(i => i._id !== image._id)
        this.data.images = this.data.images
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
      this.mergeIntoLocalData(data, true)
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
      this.mergeIntoLocalData(data, true, 300)
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.removeImageLoading(imageID)
  }

  @action
  deselectImage = async (imageID) => {
    this.setImageLoading(imageID)
    try {
      const res = await apiRequest({ url: `/pv/queue/${this.queueType}/images/deselect`, data: { imageID } })
      const { data } = res
      this.mergeIntoLocalData(data, true, 300)
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.removeImageLoading(imageID)
  }

  @action
  updateImageTransformation = async (imageID, transformation) => {
    this.setImageLoading(imageID)
    try {
      const res = await apiRequest({
        url: `/pv/queue/${this.queueType}/images/transform/${imageID}`,
        data: transformation,
      })
      const { data } = res
      this.mergeIntoLocalData(data, true)

      // Preload images
      const images = [...data.selectedImages, ...data.deselectedImages]
      FastImage.preload(prefetchArray(images.find(i => i._id === imageID)))

    } catch (error) {
      // Throw error back to EditImage screen
      throw error
    }
    this.removeImageLoading(imageID)
  }

}

export default new QueueStore()

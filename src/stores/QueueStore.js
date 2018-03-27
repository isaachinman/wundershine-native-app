import { action, toJS, runInAction, observable } from 'mobx'
import uuid from 'uuid/v1'
import { uploadImage } from 'utils/api'
import { validateImages } from 'utils/images'
import path from 'react-native-path'

class QueueStore {

  @observable
  data = []

  @observable
  imagesToUpload = []

  @observable
  currentlyUploading = false

  @action
  addImagesToUpload = async (images) => {

    const { rejectedImages, validatedImages } = await validateImages(images)

    if (rejectedImages.length > 0) {
      // Handle rejection feedback
    }

    if (validatedImages.length > 0) {
      const newImages = validatedImages.map(image => ({
        name: path.basename(image.value),
        origin: 'Need to determine origin',
        uri: image.value,
        id: uuid(), // Temporary ID until server response
        type: image.type,
        notUploadedYet: true,
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
        this.imagesToUpload = this.imagesToUpload.filter(i => i.id !== image.id)
        this.data = this.data.map((i) => {
          if (i.id === image.id) {
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
        this.imagesToUpload = this.imagesToUpload.filter(i => i.id !== image.id)
        this.data = this.data.filter(i => i.id !== image.id)
        this.currentlyUploading = false
      })
    }

  }

}

export default new QueueStore()

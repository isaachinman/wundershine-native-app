import { action, toJS, runInAction, observable } from 'mobx'
import uuid from 'uuid/v1'
import { uploadImage } from 'utils/api'
import path from 'react-native-path'

class QueueStore {

  @observable
  data = []

  @observable
  imagesToUpload = []

  @observable
  currentlyUploading = false

  @action
  addImagesToUpload = (images) => {
    console.log('Images to upload: ', images) // eslint-disable-line
    const newImages = images.map(image => ({
      name: path.basename(image.value),
      origin: 'Uploading to Cloud...',
      uri: image.value,
      id: uuid(), // Temporary ID until server response
      type: image.type,
      localOnly: true,
    }))
    this.imagesToUpload = [...this.imagesToUpload, ...newImages]
    this.data = [...this.data, ...newImages]
  }

  @action
  uploadImage = async () => {
    if (this.imagesToUpload.length < 1) {
      throw new Error('There are no images queued for upload.')
    }
    runInAction(() => this.currentlyUploading = true)

    const image = this.imagesToUpload[0]
    await uploadImage(toJS(image))

    runInAction(() => {
      this.imagesToUpload = this.imagesToUpload.filter(i => i.id !== image.id)
      this.data = this.data.map((i) => {
        if (i.id === image.id) {
          return {
            ...i,
            origin: 'Uploaded',
          }
        }
        return i
      })
    })
    runInAction(() => this.currentlyUploading = false)
  }

}

export default new QueueStore()

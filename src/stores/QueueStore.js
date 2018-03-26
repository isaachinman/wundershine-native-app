import { action, observable } from 'mobx'
import path from 'react-native-path'

class QueueStore {

  @observable
  data = []

  @observable
  photosToUpload = []

  @observable
  currentlyUploading = false

  @action
  addPhotosToUpload = (photos) => {
    console.log('Photos to upload: ', photos) // eslint-disable-line
    this.photosToUpload = [...this.photosToUpload, ...photos]
    this.data = [...this.data, ...photos.map(photo => ({
      name: path.basename(photo.value),
      origin: 'Uploading to Cloud...',
      uri: photo.value,
      id: photo.value,
      type: photo.type,
      localOnly: true,
    }))]
  }

  @action
  uploadPhoto = async () => {
    if (this.photosToUpload.length < 1) {
      throw new Error('There are no photos queued for upload.')
    }
    // const photo = this.photosToUpload[0]
    this.currentlyUploading = true
  }

}

export default new QueueStore()

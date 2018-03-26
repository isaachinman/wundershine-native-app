import { action, toJS, runInAction, observable } from 'mobx'
import { uploadPhoto } from 'utils/api'
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
    const newPhotos = photos.map(photo => ({
      name: path.basename(photo.value),
      origin: 'Uploading to Cloud...',
      uri: photo.value,
      id: photo.value,
      type: photo.type,
      localOnly: true,
    }))
    this.photosToUpload = [...this.photosToUpload, ...newPhotos]
    this.data = [...this.data, ...newPhotos]
  }

  @action
  uploadPhoto = async () => {
    if (this.photosToUpload.length < 1) {
      throw new Error('There are no photos queued for upload.')
    }
    runInAction(() => this.currentlyUploading = true)

    const photo = this.photosToUpload[0]
    await uploadPhoto(toJS(photo))

    runInAction(() => {
      this.photosToUpload = this.photosToUpload.filter(p => p.id !== photo.id)
      this.data = this.data.map((p) => {
        if (p.id === photo.id) {
          return {
            ...p,
            origin: 'Uploaded',
          }
        }
        return p
      })
    })
    runInAction(() => this.currentlyUploading = false)
  }

}

export default new QueueStore()

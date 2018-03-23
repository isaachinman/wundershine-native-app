import { action, observable } from 'mobx'

class QueueStore {

  @observable
  photosToUpload = []

  @observable
  uploadingPhotos = false

  @action
  addPhotosToUpload = (photos) => {
    console.log('Photos to upload: ', photos) // eslint-disable-line
    this.photosToUpload = [...this.photosToUpload, ...photos]
  }

}

export default new QueueStore()

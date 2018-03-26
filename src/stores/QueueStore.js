import { action, observable } from 'mobx'

class QueueStore {

  @observable
  data = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'e' }, { id: 'f' }, { id: 'g' }]

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

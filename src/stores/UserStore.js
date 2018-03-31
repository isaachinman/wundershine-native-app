import { action, computed, runInAction, observable } from 'mobx'
import { apiRequest } from 'utils/api'
import joi from 'react-native-joi'
import { createUser } from 'models'
import toast from 'utils/toast'
import { personalDetailsFormSchema } from 'schemas'

class UserStore {

  @action
  async setup() {
    await this.getUser()
  }

  @observable
  data = {}

  @observable
  error = null

  @observable
  loading = false

  @observable
  personalDetailsForm = {
    email: null,
    firstName: null,
    lastName: null,
  }

  @computed
  get personalDetailsFormIsValid() {
    return joi.validate(this.loginForm, personalDetailsFormSchema).error === null
  }

  @action
  setLoading = bool => this.loading = bool

  @action
  updateForm = (form, field, value) => this[`${form}Form`][field] = value

  @action
  getUser = async () => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ url: '/pv/user' })
      const { data } = res
      runInAction(() => {
        this.data = createUser(data)
        const { email, firstName, lastName } = this.data
        this.personalDetailsForm = { email, firstName, lastName }
      })
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.setLoading(false)
  }

  @action
  updateUser = async () => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ url: '/pv/user', data: this.personalDetailsForm })
      const { data } = res
      runInAction(() => {
        this.data = data
        this.personalDetailsForm = {
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        }
      })
      toast('Your details have been saved.')
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.setLoading(false)
  }

}

export default new UserStore()

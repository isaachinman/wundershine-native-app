import { action, computed, runInAction, observable } from 'mobx'
import { apiRequest } from 'utils/api'
import toast from 'utils/toast'

import {
  createUser,
  createPersonalDetailsForm,
  validatePersonalDetailsForm,
  createAddressForm,
  validateAddressForm,
} from 'models'

class UserStore {

  @action
  async setup() {
    await this.getUser()
  }

  @action
  teardown() {
    this.data = {}
    this.personalDetailsForm = createPersonalDetailsForm()
    this.addressForm = createAddressForm()
  }

  @observable
  data = {}

  @observable
  error = null

  @observable
  loading = false

  @observable
  personalDetailsForm = createPersonalDetailsForm()

  @computed
  get personalDetailsFormIsValid() { return validatePersonalDetailsForm(this.personalDetailsForm) }

  @observable
  addressForm = createAddressForm()

  @computed
  get addressFormIsValid() { return validateAddressForm(this.addressForm) }

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
        const {
          email,
          firstName,
          lastName,
          addresses,
        } = this.data

        this.personalDetailsForm = { email, firstName, lastName }

        const [defaultAddress] = addresses
        if (defaultAddress) {
          this.addressForm = defaultAddress
        }


      })
    } catch (error) {
      runInAction(() => this.error = error)
    }
    this.setLoading(false)
  }

  @action
  updatePersonalDetails = async () => {
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
      toast({ message: 'Your details have been saved.' })
    } catch (error) {
      runInAction(() => this.error = error)
      this.getUser()
    }
    this.setLoading(false)
  }

  @action
  updateAddresses = async () => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ url: '/pv/user', data: { addresses: [this.addressForm] } })
      const { data } = res
      runInAction(() => {
        this.addresses = data.addresses
      })
      toast({ message: 'Your address has been saved.' })
    } catch (error) {
      runInAction(() => this.error = error)
      this.getUser()
    }
    this.setLoading(false)
  }

}

export default new UserStore()

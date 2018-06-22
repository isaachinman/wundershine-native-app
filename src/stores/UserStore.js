import { action, computed, runInAction, observable } from 'mobx'
import { apiRequest } from 'utils/api'
import equal from 'deep-equal'
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
  updateForm = (form, field, value) => this[`${form}Form`][field] = value || null

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
          this.addressForm = Object.assign({}, defaultAddress)
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
  updateAddresses = async (options = {}) => {

    if (equal(this.data.addresses.toJS(), [this.addressForm])) {
      return
    }

    this.setLoading(true)
    try {
      const address = Object.assign({}, this.addressForm)
      delete address._id
      const res = await apiRequest({ url: '/pv/user', data: { addresses: [address] } })
      const { data } = res
      runInAction(() => {
        this.data = createUser(data)
        const [defaultAddress] = this.data.addresses
        if (defaultAddress) {
          this.addressForm = Object.assign({}, defaultAddress)
        }
      })
      if (options.toast) {
        toast({ message: 'Your address has been saved.' })
      }
    } catch (error) {
      runInAction(() => this.error = error)
      this.setLoading(false)
      const message = error.toString()
      toast({ message, type: 'error' })
      throw error
    }
    this.setLoading(false)
  }

  @action
  addCreditCard = async (tokenId) => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ url: '/pv/payment-methods/cc', data: { tokenId } })
      const { data } = res
      runInAction(() => {
        this.data.paymentMethods = data
      })
    } catch (error) {
      runInAction(() => this.error = error)
      this.getUser()
    }
    this.setLoading(false)
  }

  @action
  deleteCreditCard = async (ccID) => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ url: `/pv/payment-methods/cc/${ccID}`, method: 'DELETE' })
      const { data } = res
      runInAction(() => {
        this.data.paymentMethods = data
      })
    } catch (error) {
      runInAction(() => this.error = error)
      this.getUser()
    }
    this.setLoading(false)
  }

}

export default new UserStore()

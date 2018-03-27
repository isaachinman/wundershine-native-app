import { action, computed, runInAction, observable } from 'mobx'
import { AsyncStorage } from 'react-native'
import { apiRequest } from 'utils/api'
import joi from 'react-native-joi'
import { loggedInSetup } from 'stores'
import toast from 'utils/toast'
import { NavActions } from 'utils/nav'

const storeKey = '@AuthStore'

const loginFormSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
})

const signupFormSchema = joi.object().keys({
  email: joi.string().email().required(),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  password: joi.string().required(),
})

const resetPasswordRequestFormSchema = joi.object().keys({
  email: joi.string().email().required(),
})

const resetPasswordSetFormSchema = joi.object().keys({
  password: joi.string().required(),
})

class AuthStore {

  // constructor(loggedInSetup) {
  //   this.loggedInSetup = loggedInSetup
  // }

  @observable
  loading = false

  @observable
  loginStatusLoading = true // App should initialise as loading

  @action
  setLoading = bool => this.loading = bool

  @action
  updateForm = (form, field, value) => this[`${form}Form`][field] = value

  @action
  clearForm = form => Object.keys(this[`${form}Form`]).forEach(v => this[`${form}Form`][v] = null)

  /* ---------- Login ---------- */
  LOGIN_TOKEN_STORAGE_KEY = '@wundershine/login_token'

  // @persist
  @observable
  token = null

  @observable
  loggedIn = false

  @observable
  loginForm = {
    email: null,
    password: null,
  }

  @action
  redirectToLoggedInUI = (doNav = false) => {
    runInAction(() => this.loggedIn = true)
    NavActions.setDrawerEnabled({ side: 'left', enabled: true })
    if (doNav) {
      NavActions.resetTo({ screen: 'ImageQueue' })
    }
    loggedInSetup()
  }

  @action
  redirectToLoggedOutUI = () => {
    NavActions.setDrawerEnabled({ side: 'left', enabled: false })
    NavActions.resetTo({ screen: 'Onboarding' })
  }

  @computed
  get loginFormIsValid() { return joi.validate(this.loginForm, loginFormSchema).error === null }

  @action
  async setToken(token) {
    await AsyncStorage.setItem(`${storeKey}:${this.LOGIN_TOKEN_STORAGE_KEY}`, token)
    runInAction(() => this.token = token)
  }

  @action
  async getLoginStatus() {
    runInAction(() => this.loginStatusLoading = true)
    const token = await AsyncStorage.getItem(`${storeKey}:${this.LOGIN_TOKEN_STORAGE_KEY}`)

    if (typeof token === 'string') {

      await this.setToken(token)
      try {
        await apiRequest({ url: '/pv/authentication/check-token' })
        this.redirectToLoggedInUI()
        this.refreshToken()
      } catch (error) {
        runInAction(() => this.logout())
      }

    } else {
      runInAction(() => this.loggedIn = false)
    }

    runInAction(() => this.loginStatusLoading = false)
    this.setLoading(false)
  }

  @action
  login = async (credentials) => {
    this.setLoading(true)
    try {
      const res = await apiRequest({ url: '/pb/login', data: credentials })

      await this.setToken(res.data.token)
      this.clearForm('login')
      this.setLoading(false)
      this.redirectToLoggedInUI(true)

    } catch (error) {
      this.setLoading(false)
      let message = error.toString()
      if (error.response && error.response.status === 401) {
        message = 'Incorrect email or password.'
      }
      toast({ message, type: 'error' })
    }
  }

  @action
  async refreshToken() {
    try {
      const res = await apiRequest({ url: '/pv/authentication/refresh-token' })
      const newToken = res.data.token
      this.setToken(newToken)
    } catch (error) {
      // Handle refresh error here
    }
  }

  @action
  async logout() {
    await AsyncStorage.removeItem(`${storeKey}:${this.LOGIN_TOKEN_STORAGE_KEY}`)
    runInAction(() => this.loggedIn = false)
    this.redirectToLoggedOutUI()
  }

  /* ---------- Signup ---------- */
  @observable
  signupForm = {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
  }

  @computed
  get signupFormIsValid() { return joi.validate(this.signupForm, signupFormSchema).error === null }

  @action
  signup = async () => {
    this.setLoading(true)
    const { email, password } = this.signupForm
    try {

      await apiRequest({ url: '/pb/signup', data: this.signupForm })
      await this.login({ email, password })
      this.clearForm('signup')

    } catch (error) {
      this.setLoading(false)
      let message = error.toString()
      if (error.response && error.response.data && error.response.data.message) {
        ({ message } = error.response.data)
      }
      toast({ message, type: 'error' })
    }
  }

  /* ---------- Reset Password ---------- */
  @observable
  resetPasswordRequestForm = {
    email: null,
  }

  @observable
  resetPasswordSetForm = {
    password: null,
  }

  @observable
  resetPasswordReturningEmail = null

  @computed
  get resetPasswordRequestFormIsValid() {
    return joi.validate(
      this.resetPasswordRequestForm,
      resetPasswordRequestFormSchema,
    ).error === null
  }

  @computed
  get resetPasswordSetFormIsValid() {
    return joi.validate(
      this.resetPasswordSetForm,
      resetPasswordSetFormSchema,
    ).error === null
  }

  @action
  requestPasswordReset = async () => {
    this.setLoading(true)
    try {

      await apiRequest({ url: '/pb/reset-password/request', data: this.resetPasswordRequestForm })
      this.clearForm('resetPasswordRequest')
      this.setLoading(false)
      toast({ message: 'A reset email was sent.' })

    } catch (error) {
      this.setLoading(false)
      let message = error.toString()
      if (error.response) {
        if (error.response.status === 404) {
          message = 'Account not found.'
        } else if (error.response.data && error.response.data.message) {
          ({ message } = error.response.data)
        }
      }
      toast({ message, type: 'error' })
    }
  }

  @action
  validateResetPasswordToken = async (token) => {
    this.setLoading(true)
    try {

      const res = await apiRequest({ url: '/pb/reset-password/validate-token', data: { token } })
      runInAction(() => this.resetPasswordReturningEmail = res.data.email)
      this.setLoading(false)

    } catch (error) {
      this.setLoading(false)
      let message = error.toString()
      if (error.response) {
        if (error.response.status === 401) {
          message = 'Link is invalid or has expired.'
        }
      }
      toast({ message, type: 'error' })
    }
  }

  @action
  resetPassword = async (token) => {
    this.setLoading(true)
    const { password } = this.resetPasswordSetForm
    try {

      await apiRequest({ url: '/pb/reset-password/set', data: { token, password } })
      await this.login({
        email: this.resetPasswordReturningEmail,
        password,
      })
      this.clearForm('resetPasswordSet')

    } catch (error) {
      this.setLoading(false)
      let message = error.toString()
      if (error.response) {
        if (error.response.status === 401) {
          message = 'Link is invalid or has expired.'
        }
      }
      toast({ message, type: 'error' })
    }
  }

}

export default new AuthStore()

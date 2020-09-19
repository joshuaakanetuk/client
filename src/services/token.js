import config from '../config'

const TokenService = {
  saveUser(user) {
    window.sessionStorage.setItem('user', user)
  },
  saveAuthToken(token) {
    window.sessionStorage.setItem(config.TOKEN_KEY, token)
  },
  getAuthToken() {
    return window.sessionStorage.getItem(config.TOKEN_KEY)
  },
  getUser() {
    return window.sessionStorage.getItem('user')
  },
  clearAuthToken() {
    window.sessionStorage.removeItem(config.TOKEN_KEY)
  },
  clearUser() {
    window.sessionStorage.removeItem('user')
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
}

export default TokenService

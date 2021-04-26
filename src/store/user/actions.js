import {
  SET_CURRENT_USER,
  DELETE_CURRENT_USER,
  ADD_USER,
  DELETE_USER
} from './mutation-types'

export async function login ({ commit, dispatch, getters }, username) {
  const newUser = { username }
  if (newUser.username === 'anonymous') {
    return dispatch('loginAsAnonymous')
  }
  this._vm.$disconnect()
  this._vm.$connect(process.env.API_WS + `?username=${newUser.username}`, {
    connectManually: true,
    reconnection: false,
    format: 'json'
  })
  commit(SET_CURRENT_USER, newUser)
  if (!getters.getUsers.some(user => user.username === newUser.username)) {
    commit(ADD_USER, newUser)
  }
}
export async function relogin ({ dispatch, getters }) {
  if (!getters.isLoggedIn) {
    return dispatch('loginAsAnonymous')
  }
  return dispatch('login', getters.getCurrentUser.username)
}
export async function loginAsAnonymous ({ commit }) {
  this._vm.$disconnect()
  this._vm.$connect(process.env.API_WS + '?username=anonymous', {
    connectManually: true,
    reconnection: false,
    format: 'json'
  })
  commit(DELETE_CURRENT_USER)
}
export async function logout ({ dispatch, getters, commit }) {
  if (getters.isLoggedIn) {
    commit(DELETE_USER, getters.getCurrentUser)
  }
  await dispatch('loginAsAnonymous')
}
export async function switchCurrentUserTo ({ commit, getters, dispatch }, username) {
  const user = getters.getUsers.find(user => user.username === username)
  if (!user) {
    return
  }
  await dispatch('login', user.username)
  commit(SET_CURRENT_USER, user)
}

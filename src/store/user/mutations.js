
import {
  SET_CURRENT_USER,
  DELETE_CURRENT_USER,
  ADD_USER,
  DELETE_USER
} from './mutation-types'
export default {
  [SET_CURRENT_USER] (state, user) {
    state.currentUser = user
  },
  [DELETE_CURRENT_USER] (state) {
    state.currentUser = null
  },
  [DELETE_USER] (state, user) {
    state.users = state.users.filter(({ username }) => username !== user.username)
  },
  [ADD_USER] (state, user) {
    state.users.push(user)
  }
}


import {
  SET_SOCKET,
  SET_CONNECTED,
  SET_DISCONNECTED
} from './mutation-types'
export default {
  [SET_SOCKET] (state, socket) {
    state.socket = socket
  },
  [SET_CONNECTED] (state) {
    state.isConnected = true
  },
  [SET_DISCONNECTED] (state) {
    state.isConnected = false
  }
}

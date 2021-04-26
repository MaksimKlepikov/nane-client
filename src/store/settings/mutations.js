
import {
  SET_CONNECTION_STATUS
} from './mutation-types'
export default {
  [SET_CONNECTION_STATUS] (state, connectionStatus) {
    state.connectionStatus = connectionStatus ?? 3
  }
}

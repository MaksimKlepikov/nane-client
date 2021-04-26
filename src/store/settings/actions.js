import {
  SET_CONNECTION_STATUS
} from './mutation-types'
export async function updateConnectionStatus ({ commit }, readyState) {
  commit(SET_CONNECTION_STATUS, readyState)
}

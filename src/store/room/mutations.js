
import {
  SET_ALL,
  ADD_ROOM
} from './mutation-types'
export default {
  [SET_ALL] (state, newData) {
    state.rooms = newData.sort((a, b) => a.name.localeCompare(b.name))
  },
  [ADD_ROOM] (state, room) {
    state.rooms.push(room)
  }
}

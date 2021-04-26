
import Vue from 'vue'
import {
  SET_ALL_FOR_ROOM,
  SET_ALL_OUTDATED,
  ADD_MESSAGE,
  SET_ROOM
} from './mutation-types'
export default {
  [SET_ALL_FOR_ROOM] ({ messagesByRoom }, { roomId, messages }) {
    Vue.set(messagesByRoom, roomId, {
      ...messagesByRoom[roomId],
      isOutdated: false,
      messages
    })
  },
  [SET_ALL_OUTDATED] ({ messagesByRoom }) {
    for (const [, room] of Object.entries(messagesByRoom)) {
      room.isOutdated = true
    }
  },
  [ADD_MESSAGE] ({ messagesByRoom }, message) {
    messagesByRoom[message.room].messages.push(message)
  },
  [SET_ROOM] ({ messagesByRoom }, roomId) {
    Vue.set(messagesByRoom, roomId, {
      isOutdated: true,
      messages: []
    })
  }
}

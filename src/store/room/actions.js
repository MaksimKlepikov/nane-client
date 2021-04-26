import axios from 'axios'
import {
  SET_ALL,
  ADD_ROOM
} from './mutation-types'
export async function fetchAll ({ commit }) {
  const { data: { result } } = await axios.get('/rooms')
  commit(SET_ALL, result.map(room => ({
    ...room,
    last_message: {
      ...room.last_message,
      created: new Date(room.created)
    }
  })))
}
export async function addRoom ({ commit }, room) {
  commit(ADD_ROOM, {
    ...room,
    last_message: {
      ...room.last_message,
      created: new Date(room.created)
    }
  })
}

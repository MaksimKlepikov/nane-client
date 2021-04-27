import {
  SET_SOCKET,
  SET_CONNECTED,
  SET_DISCONNECTED
} from './mutation-types'

export async function connect ({ commit, dispatch, getters }, username) {
  const currentSocket = getters.getSocket
  if (currentSocket) {
    currentSocket.close()
  }
  const socket = new WebSocket(process.env.API_WS + `?username=${username}`)
  commit(SET_SOCKET, socket)

  socket.onopen = () => {
    commit(SET_CONNECTED)
  }
  socket.onerror = () => {
    commit(SET_DISCONNECTED)
  }
  socket.onclose = async () => {
    if (getters.getSocket.readyState > 1) {
      await dispatch('message/outdateAll', null, { root: true })
      setTimeout(_ => dispatch('connect', username), 1000)
    }
  }

  socket.addEventListener('message', function ({ data }) {
    const newMessage = JSON.parse(data)
    dispatch('message/newMessage', newMessage, { root: true })
  })
}
export async function sendJSON ({ getters }, json) {
  const socket = getters.getSocket
  socket.send(json)
}


export default {

  getMessagesByRoom: (state) => (roomId) => {
    return state.messagesByRoom[roomId]?.messages ?? []
  },
  isMessagesOutdated: (state) => (roomId) => {
    return state.messagesByRoom[roomId]?.isOutdated ?? true
  },
  isRoomExist: (state) => (roomId) => {
    return state.messagesByRoom[roomId]
  }
}

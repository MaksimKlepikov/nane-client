export default {

  getRooms (state) {
    return state.rooms
  },
  isRoomExist: (state) => (roomId) => {
    return state.rooms.some(({ name }) => name === roomId)
  }

}

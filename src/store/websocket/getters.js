export default {

  getSocket (state) {
    return state.socket
  },
  isNoConnection (state) {
    return !state.isConnected
  }

}

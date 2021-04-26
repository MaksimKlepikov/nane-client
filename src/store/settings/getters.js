export default {
  isNoConnection (state) {
    return state.connectionStatus !== 1
  },
  getMaxLengthSettings (state) {
    return state.maxLength
  },
  getPageSize (state) {
    return state.pageSize
  }
}

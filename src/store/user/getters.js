export default {

  getUsers (state) {
    return state.users
  },
  getCurrentUser (state) {
    return state.currentUser
  },
  isLoggedIn (state) {
    return state.currentUser
  }

}

const UserModule = {
  namespaced: true,

  state: {
    token: null,
    user: null
  },
  mutations: {
    LOGIN_USER (state, userData) {
      state.user = userData.user
      state.token = userData.token
    },
    LOGOUT_USER (state) {
      state.user = null
      state.token = null
    }
  },
  getters: {
    userId: state => {
      return (state.user) ? state.user.id : null
    },
    email: state => {
      return (state.user) ? state.user.email : null
    },
    token: state => {
      return state.token
    }
  }
}

export default UserModule

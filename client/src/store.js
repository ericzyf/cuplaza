import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // state of current user
    curtUser_uid: null,
    curtUser_email: null,
    curtUser_phone: null,
    curtUser_userName:	null,
    curtUser_password: null
  },
  mutations: {
    // payload is the user object returned by backend api
    login(state, payload) {
      state.curtUser_uid = payload._id
      state.curtUser_email = payload.email
      state.curtUser_phone = payload.phone
      state.curtUser_userName = payload.userName
      state.curtUser_password = payload.password
    },
    logout(state) {
      state.curtUser_uid = null
      state.curtUser_email = null
      state.curtUser_phone = null
      state.curtUser_userName = null
      state.curtUser_password = null
    }
  },
  actions: {

  }
})

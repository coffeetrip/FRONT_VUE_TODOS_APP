// 로그인 로직의 상태관리하기
import jwtDecode from 'jwt-decode'
const state = {
  token: null,
}

const mutations = {
  setToken(state, token) {
    state.token = token
  }
}

const actions = {
  login(options, token) {
    options.commit('setToken', token)
  },
  logout(options) {
    options.commit('setToken', null)
  }
}

// computed와 비슷?
const getters = {
  isAuthenticated(state) {
    return state.token ? true : false
  },
  requestHeader(state) {
    return {
      headers: {
        Authorization: `JWT ${state.token}`
      }
    }
  },
  userId(state) {
    return state.token ? jwtDecode(state.token).user_id : null
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
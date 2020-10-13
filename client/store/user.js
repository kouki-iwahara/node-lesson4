// import axios from 'axios'

export const state = () => ({
  user: {
    id: '',
    name: '',
  },
})

export const mutations = {
  setUser(state, user) {
    state.user = { ...state, ...user }
  },
}

export const getters = {
  user(state) {
    return state.user
  },
}

export const actions = {
  setUser({ commit }, user) {
    commit('setUser', user)
  },
}

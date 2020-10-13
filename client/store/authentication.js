export const state = () => ({
  loggedIn: {
    isLoggedIn: false,
  },
})

export const mutations = {
  setLoggedIn(state, loggedIn) {
    state.loggedIn.isLoggedIn = loggedIn
  },
}

export const getters = {}

export const actions = {
  async signup({ commit }, req) {
    const res = await this.$axios
      .$post('/api/auth/signup', req)
      .catch((err) => {
        throw new Error(err)
      })
    commit('user/setUser', { id: res.id, name: res.name }, { root: true })
    return res
  },
  async login({ state, commit, dispatch }, req) {
    const res = await this.$auth.loginWith('local', {
      data: req,
    })
    commit('setLoggedIn', this.$auth.loggedIn)
    dispatch(
      'user/setUser',
      { id: res.data.user.id, name: res.data.user.name },
      { root: true }
    )
  },
}

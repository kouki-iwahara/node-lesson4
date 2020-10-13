export const state = () => ({
  post: {
    contents: [],
  },
})

export const mutations = {
  setContents(state, contents) {
    state.post.contents = contents.slice()
  },
  deletePost(state, postId) {
    state.post.contents = state.post.contents.filter(
      (content) => content.id !== postId
    )
  },
}

export const getters = {
  contents(state) {
    return state.post.contents
  },
}

export const actions = {
  async getPosts({ state, commit }, userId) {
    const res = await this.$axios.$get(`/api/post?userId=${userId}`)
    commit('setContents', res.postsResponse)
  },
  async createPost({ commit }, { userId, req }) {
    const result = await this.$axios.$post(`/api/post/${userId}`, req)
    return result
  },
  async updatePost({ commit }, { postId, req }) {
    const result = await this.$axios.$put(`/api/post/${postId}`, req)
    return result
  },
  async deletePost({ commit }, postId) {
    await this.$axios.$delete(`/api/post/${postId}`)
    commit('deletePost', postId)
  },
  async pushLike({ commit }, req) {
    await this.$axios.$patch('/api/like', req)
  },
}

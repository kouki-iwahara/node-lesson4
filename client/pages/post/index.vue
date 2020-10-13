<template>
  <div>
    <div class="header">
      <Header />
    </div>
    <div class="main">
      <div v-for="post in computedPosts" :key="post.id" class="content">
        <div class="title">{{ post.title }}</div>
        <div class="subtitle">{{ post.content }}</div>
        <div class="username">{{ post.userName }}</div>
        <button
          class="like"
          :class="{ active: post.isLiked === 1 }"
          @click="pushLike($store.state.auth.user.id, post.id)"
        >
          {{ post.likeCounts }}いいね
        </button>
        <div v-if="post.userName === $store.state.auth.user.name">
          <button @click="toEdditPage(post.id, post.title, post.content)">
            編集
          </button>
          <button @click="deletePost(post.id)">削除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      postId: '',
    }
  },
  computed: {
    computedPosts() {
      return this.$store.getters['post/contents']
    },
  },
  async created() {
    await this.getPosts(this.$store.state.auth.user.id)
  },
  methods: {
    async getPosts(userId) {
      await this.$store.dispatch('post/getPosts', userId)
    },
    toEdditPage(postId, title, content) {
      this.$router.push(`/post/${postId}?title=${title}&&content=${content}`)
    },
    async deletePost(postId) {
      await this.$store.dispatch('post/deletePost', postId)
      this.$router.push('/post')
    },
    async pushLike(userId, postId) {
      await this.$store.dispatch('post/pushLike', { userId, postId })
      await this.getPosts(userId)
    },
  },
}
</script>

<style scoped>
.content {
  margin-bottom: 30px;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.username {
  font-weight: 300;
  font-size: 30px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.like {
  font-size: 40px;
}
.active {
  font-size: 40px;
  background-color: aquamarine;
}
</style>

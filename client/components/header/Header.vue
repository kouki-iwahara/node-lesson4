<template>
  <div class="nav">
    <nuxt-link to="/post" class="container_nav">みんなの投稿</nuxt-link>
    <nuxt-link to="/post/create" class="container_nav">作成</nuxt-link>
    <div>
      {{ userName }}
    </div>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: this.$store.state.auth.user.name,
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style scoped>
.nav {
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  font-size: 30px;
}
.container_nav {
  height: 30px;
  margin: 18px;
}
</style>

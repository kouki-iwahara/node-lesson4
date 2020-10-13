<template>
  <div>
    <div class="header">
      <Header />
    </div>
    <div class="container">
      <div class="subtitle">
        <div>タイトル</div>
        <input v-model="title" class="" type="text" />
      </div>
      <div>
        <div class="subtitle">コンテンツ</div>
        <div>
          <textarea
            id=""
            v-model="content"
            name=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <button @click="createPost">作成</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
    }
  },
  methods: {
    async createPost() {
      const req = {
        title: this.title,
        content: this.content,
      }
      await this.$store.dispatch('post/createPost', {
        userId: this.$store.state.user.user.id,
        req,
      })
      this.$router.push('/post')
    },
  },
}
</script>

<style scoped>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
input {
  height: 30px;
  width: 300px;
}
textarea {
  height: 300px;
  width: 500px;
}

.subtitle {
  font-weight: 300;
  font-size: 32px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.container {
  margin: 0 auto;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

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
      <button @click="updatePost">編集</button>
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
  created() {
    this.title = this.$route.query.title
    this.content = this.$route.query.content
  },
  methods: {
    async updatePost() {
      const req = {
        title: this.title,
        content: this.content,
        userId: this.$store.state.user.user.id,
      }
      await this.$store
        .dispatch('post/updatePost', {
          postId: this.$route.params.postId,
          req,
        })
        .catch((err) => {
          throw new Error(err)
        })
      this.$router.push('/post')
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  /* display: flex; */
  justify-content: center;
  align-items: center;
  text-align: center;
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
</style>

<template>
  <div class="container">
    <div>
      <div>
        <p>name</p>
        <input id="" v-model="name" type="text" name="" />
      </div>
      <div>
        <p>email</p>
        <input id="" v-model="email" type="email" name="" />
      </div>
      <div>
        <p>password</p>
        <input id="" v-model="password" type="password" name="" />
      </div>
      <div>
        <p>confirm password</p>
        <input id="" v-model="confirmPassword" type="password" name="" />
      </div>
      <div>
        <button @click="signup">登録</button>
      </div>
    </div>
  </div>
</template>

<script>
import { isValidationComplete } from '../../validation/user.validation'
export default {
  auth: false,
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  },
  methods: {
    async signup() {
      if (
        !isValidationComplete(
          this.name,
          this.email,
          this.password,
          this.confirmPassword
        )
      ) {
        return
      }
      const user = await this.$store.dispatch('authentication/signup', {
        name: this.name,
        password: this.password,
        email: this.email,
      })
      await this.$store.dispatch('authentication/login', {
        email: user.email,
        password: this.password,
      })
      this.resetInput()
      this.$router.push('/post')
    },
    resetInput() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
    },
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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

.links {
  padding-top: 15px;
}
</style>

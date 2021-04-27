<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  async created () {
    await this.loginAsAnonymous()
  },
  methods: {
    ...mapActions('user', {
      loginAsAnonymous: 'loginAsAnonymous'
    })
  }
}
</script>

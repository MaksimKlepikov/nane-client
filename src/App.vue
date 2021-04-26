<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('room', {
      isRoomExistInRoomList: 'isRoomExist'
    }),
    ...mapGetters('user', {
      isLoggedIn: 'isLoggedIn'
    }),
    ...mapGetters('settings', {
      isNoConnection: 'isNoConnection'
    })
  },
  async created () {
    this.$options.sockets.onopen = async () => {
      await this.updateConnectionStatus(this.$socket?.readyState)
    }
    this.$options.sockets.onclose = async (evt) => {
      await this.updateConnectionStatus(this.$socket?.readyState)
      await this.outdateAllMessages()
      setTimeout(async () => {
        if (this.isNoConnection) {
          await this.relogin()
        }
      }, 1000)
    }
    this.$options.sockets.onmessage = this.onNewMessage
    await this.loginAsAnonymous()
  },
  methods: {
    ...mapActions('message', {
      outdateAllMessages: 'outdateAll',
      newMessage: 'newMessage'
    }),
    ...mapActions('room', {
      addRoom: 'addRoom'
    }),
    ...mapActions('user', {
      loginAsAnonymous: 'loginAsAnonymous',
      relogin: 'relogin'
    }),
    ...mapActions('settings', {
      updateConnectionStatus: 'updateConnectionStatus'
    }),
    async onNewMessage ({ data }) {
      const newMessage = JSON.parse(data)
      if (!this.isRoomExistInRoomList(newMessage.room)) {
        await this.addRoom({
          name: newMessage.room,
          last_message: newMessage
        })
      }
      return this.newMessage(newMessage)
    }
  }
}
</script>

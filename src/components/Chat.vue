<template>
  <div class="relative-position column no-wrap">
    <div class="col">
      <q-infinite-scroll
        ref="chatScroll"
        :offset="500"
        reverse
        class="col full-height column no-wrap scroll relative-position q-px-xs-sm q-pl-md-md bg-grey-3"
        @load="loadMore"
      >
        <template slot="loading">
          <div class="row justify-center q-my-md">
            <q-spinner
              color="primary"
              name="dots"
              size="40px"
            />
          </div>
        </template>

        <q-space class="col" />
        <div class="row">
          <chat-message
            v-for="message in messagesToShow"
            :key="message.id"
            :message="message"
            :current-user="getCurrentUser"
            class="col-12 col-md-7"
          />
        </div>
      </q-infinite-scroll>
    </div>
    <q-inner-loading
      class="fixed-center transparent"
      :showing="isMessagesLoading"
    >
      <q-spinner-tail
        color="primary"
        size="2em"
      />
    </q-inner-loading>
    <q-toolbar
      v-if="isLoggedIn"
      class="col-auto row q-py-xs text-black"
    >
      <q-input
        v-model="messageToSendText"
        :maxlength="maxLength.message"
        input-style="max-height:50vh"
        rounded
        outlined
        dense
        autogrow
        class="col-grow q-mr-sm"
        bg-color="white"
        placeholder="Type a message (Ctrl+Enter to send)"
        @keydown.enter="onInputEnterKey"
      />
      <q-btn
        round
        :disable="isNoConnection || messageToSendText.length === 0"
        flat
        color="primary"
        icon="send"
        @click="sendNewMessage"
        @keypress.prevent
      />
    </q-toolbar>
    <q-toolbar
      v-else
      class="col-auto row q-py-xs text-black"
    >
      <q-btn
        class="col"
        rounded
        no-caps
        unelevated
        :disable="isNoConnection"
        color="white"
        text-color="primary"
        label="Join"
        @click="$emit('ask-login')"
      />
    </q-toolbar>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import ChatMessage from 'components/ChatMessage.vue'

export default {

  components: {
    ChatMessage
  },
  async beforeRouteUpdate (to, from, next) {
    next()
    this.pagesLoaded = 1
    this.$refs.chatScroll.reset()
    this.$refs.chatScroll.resume()
    await this.loadRoomMessages(to.params.roomId)
    this.scrollChatToBottom()
  },

  data () {
    return {
      pagesLoaded: 1,
      isMessagesLoading: true,
      messageToSendText: ''
    }
  },
  computed: {
    ...mapGetters('user', {
      isLoggedIn: 'isLoggedIn',
      getCurrentUser: 'getCurrentUser'
    }),
    ...mapGetters('message', {
      getMessagesByRoom: 'getMessagesByRoom',
      isMessagesOutdated: 'isMessagesOutdated'
    }),
    ...mapGetters('settings', {
      maxLength: 'getMaxLengthSettings',
      pageSize: 'getPageSize'
    }),
    ...mapGetters('websocket', {
      isNoConnection: 'isNoConnection'
    }),
    roomId () {
      return this.$route.params.roomId
    },
    messagesToShow () {
      return this.getMessagesByRoom(this.roomId).slice(-this.messagesToShowCount)
    },
    messagesTotalCount () {
      return this.getMessagesByRoom(this.roomId).length
    },
    messagesToShowCount () {
      return this.pageSize * this.pagesLoaded
    }

  },
  watch: {
    async isNoConnection (newValue, oldValue) {
      if (!newValue) {
        await this.loadRoomMessages(this.roomId)
      }
    }
  },
  async created () {
    await this.loadRoomMessages(this.roomId)
    this.scrollChatToBottom()
  },
  methods: {
    ...mapActions('message', {
      fetchByRoom: 'fetchByRoom',
      sendMessage: 'sendMessage'
    }),
    async loadRoomMessages (roomId) {
      if (!roomId || !this.isMessagesOutdated(roomId)) {
        this.isMessagesLoading = false
        return
      }
      this.isMessagesLoading = true
      await this.fetchByRoom(roomId)
      this.isMessagesLoading = false
      this.$refs.chatScroll.resume()
    },
    scrollChatToBottom () {
      const el = this.$refs.chatScroll.$el
      el.scrollTop = el.scrollHeight
    },
    loadMore (index, done) {
      this.pagesLoaded = index
      const isNothingToLoad = this.messagesTotalCount <= this.messagesToShowCount
      done(isNothingToLoad)
    },
    async onInputEnterKey (e) {
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        await this.sendNewMessage()
      }
    },
    async sendNewMessage () {
      if (this.isNoConnection) {
        return
      }
      const newMessage = {
        created: new Date(),
        sender: {
          username: this.getCurrentUser.username
        },
        room: this.roomId,
        text: this.messageToSendText
      }
      await this.sendMessage(newMessage)
      this.messageToSendText = ''
    }
  }
}
</script>

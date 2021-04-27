<template>
  <q-page
    class="row no-scroll"
    :style-fn="pageStyleFn"
  >
    <router-view
      v-if="isShowRoomList"
      class="col-12 col-md-4 full-height"
      name="room-list-panel"
      @ask-login="$emit('ask-login')"
    />
    <router-view
      v-if="isShowChatPanel"
      class="col full-height"
      name="chat-panel"
      @ask-login="$emit('ask-login')"
    />
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
    }
  },
  computed: {
    roomId () {
      return this.$route.params.roomId
    },
    isRoomSelected () {
      return this.$route.name === 'room' && this.$route.params.roomId
    },
    isShowRoomList () {
      return this.$q.platform.is.desktop || this.$route.name === 'index'
    },
    isShowChatPanel () {
      return this.$q.platform.is.desktop || this.isRoomSelected
    }
  },
  methods: {
    pageStyleFn (offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen
      const size = offset ? `calc(100vh - ${offset}px)` : '100vh'
      return {
        minHeight: size,
        height: size,
        maxHeight: size
      }
    }
  }
}
</script>

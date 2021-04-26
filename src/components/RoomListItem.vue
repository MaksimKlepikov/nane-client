<template>
  <q-item
    class="room-list__item"
    clickable
    :to="routeTo"
    :replace="isChatOpened"
  >
    <q-item-section>
      <q-item-label>
        {{ room.name }}
      </q-item-label>
      <q-item-label
        caption
        class="ellipsis"
      >
        @{{ lastMessage.sender.username }} - {{ lastMessage.text }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    room: {
      required: true,
      type: Object,
      default: () => null
    }
  },
  // name: 'ComponentName',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('message', {
      getMessagesByRoom: 'getMessagesByRoom'
    }),
    isChatOpened () {
      return !!this.$route.params.roomId
    },
    lastMessage () {
      const roomMessages = this.getMessagesByRoom(this.room.name)
      const lastMessage = roomMessages[roomMessages.length - 1]
      return lastMessage ?? this.room.last_message
    },
    routeTo () {
      return (this.$route.name === 'room' && this.$route.params.roomId === this.room.name)
        ? { name: 'index' }
        : { name: 'room', params: { roomId: this.room.name } }
    }

  }
}
</script>
<style lang="scss">

.room-list__item{
  overflow-wrap: break-word;
  white-space: pre-line;
}
</style>

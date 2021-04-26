<template>
  <q-scroll-area>
    <q-list separator>
      <q-item-label
        header
        class="text-grey-8 row items-center"
      >
        <q-btn
          :disable="isNoConnection"
          outline
          rounded
          no-caps
          color="primary"
          icon="add"
          label="Add Room"
          @click="onAddRoom"
        />
      </q-item-label>
      <room-list-item
        v-for="room in rooms"
        :key="room.name"
        :room="room"
      />
    </q-list>
  </q-scroll-area>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RoomListItem from 'components/RoomListItem.vue'
import CreateRoomForm from 'src/components/forms/CreateRoomForm.vue'

export default {
  components: {
    RoomListItem
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('room', {
      rooms: 'getRooms'
    }),
    ...mapGetters('user', {
      isLoggedIn: 'isLoggedIn',
      getCurrentUser: 'getCurrentUser'
    }),
    ...mapGetters('settings', {
      isNoConnection: 'isNoConnection'
    })
  },
  async created () {
    await this.fetchAllRooms()
  },
  methods: {
    ...mapActions('room', {
      fetchAllRooms: 'fetchAll'
    }),
    ...mapActions('message', {
      sendMessage: 'sendMessage'
    }),
    openCreateRoomDialog () {
      return new Promise((resolve, reject) => this.$q.dialog({
        component: CreateRoomForm,
        rooms: this.rooms,
        currentUsername: this.getCurrentUser.username,
        parent: this
      }).onOk(resolve).onCancel(reject))
    },
    async onAddRoom () {
      if (!this.isLoggedIn) {
        return this.$emit('ask-login')
      }
      try {
        const newMessage = await this.openCreateRoomDialog()
        await this.sendMessage(newMessage)
        this.$router.push({ name: 'room', params: { roomId: newMessage.room } })
      } catch (e) {
        if (e) { console.error(e) }
      }
    }
  }
}
</script>

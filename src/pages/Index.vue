<template>
  <q-page class="row">
    <room-list class="col-12 col-md-4" />
    <q-separator
      vertical
    />
    <chat class="col chat" />
  </q-page>
</template>

<script>
import RoomList from 'components/RoomList.vue'
import Chat from 'components/Chat.vue'
export default {
  name: 'PageIndex',
  components: {
    RoomList,
    Chat
  }
}
</script>

<style lang="scss">
.chat{
  max-height: 90vh;
}
</style>

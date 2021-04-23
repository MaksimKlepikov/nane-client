<template>
  <q-scroll-area class="">
    <q-list>
      <q-item-label
        header
        class="text-grey-8"
      >
        Rooms
      </q-item-label>

      <q-item
        v-for="room in rooms"
        :key="room.name"
        clickable
      >
        <q-item-section>
          <q-item-label>{{ room.name }}</q-item-label>
          <q-item-label caption>
            sender - last message
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script>

import Room from 'src/store/room/model.js'

export default {
  data () {
    return {
    }
  },
  computed: {
    rooms () {
      return Room.query().with('messages').get()
    }
  },
  created () {
    Room.api().fetch()
  }
}
</script>

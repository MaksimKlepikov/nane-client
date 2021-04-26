<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <q-input
          ref="roomNameInput"
          v-model="roomName"
          filled
          autofocus
          label="Room Name"
          lazy-rules
          :maxlength="maxLength.roomName"
          :rules="[
            val => val && val.length > 0 || 'Please enter the name of the room',
            val => !rooms.some(room=>room.name===val) || 'Room is already exist',
          ]"
        />
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="firstMessage"
          :maxlength="maxLength.message"
          input-style="max-height:50vh"
          outlined
          rounded
          autogrow
          bg-color="white"
          placeholder="Type a message"
          label="First Message"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          color="primary"
          label="Cancel"
          flat
          @click="onCancel"
        />
        <q-btn
          color="primary"
          label="Add"
          rounded
          outline
          @click="onSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'CreateRoomForm',
  props: {
    rooms: {
      required: true,
      type: Array,
      default: () => []
    },
    currentUsername: {
      required: true,
      type: String,
      default: null
    }
  },
  data () {
    return {
      roomName: '',
      firstMessage: 'Room created'
    }
  },
  computed: {
    ...mapGetters('settings', {
      maxLength: 'getMaxLengthSettings'
    })
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$emit('hide')
    },

    onSubmit () {
      const newMessage = {
        created: new Date(),
        sender: {
          username: this.currentUsername
        },
        room: this.roomName,
        text: this.firstMessage
      }
      if (this.$refs.roomNameInput.validate()) {
        this.$emit('ok', newMessage)
        this.hide()
      }
    },

    onCancel () {
      this.hide()
    }
  }
}
</script>

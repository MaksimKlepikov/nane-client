<template>
  <q-item
    :dark="isMyMessage"
    class="q-my-md rounded-borders chat__message"
    :class="{'chat__message_bg_my':isMyMessage}"
  >
    <q-item-section>
      <q-item-label>
        <span class="text-weight-bold">{{ message.sender.username }}</span>
      </q-item-label>
      <q-item-label>
        {{ message.text }}
      </q-item-label>
      <q-item-label
        caption
        class="text-right"
      >
        <span class="">{{ timestamp }}</span>
      </q-item-label>
    </q-item-section>
    <q-item-section
      v-if="loading"
      side
    >
      <div class="row justify-end q-my-md">
        <q-spinner
          color="primary"
          name="dots"
          size="20px"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { date } from 'quasar'

export default {
  props: {
    message: {
      required: true,
      type: Object,
      default: () => null
    },
    loading: {
      type: Boolean,
      default: false

    }
  },
  // name: 'ComponentName',
  data () {
    return {}
  },
  computed: {
    timestamp () {
      return date.formatDate(this.message.created, 'HH:mm DD-MM-YYYY')
    },
    isMyMessage () {
      return false
    }
  }

}
</script>

<style lang="scss">

.chat__message{
  background: $message-bg;
  overflow-wrap: break-word;
  white-space: pre-line;
}
.chat__message_bg_my{
  background: $message-bg-my;
}

</style>

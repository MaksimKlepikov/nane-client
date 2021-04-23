<template>
  <q-item
    dark
    style="max-width:500px"
    class="rounded-borders chat__message chat__message_bg_my"
  >
    <q-item-section>
      <q-item-label>
        <span class="text-weight-bold">Username</span>
      </q-item-label>
      <q-item-label>Text message Text message Text message Text message Text message Text message Text message</q-item-label>
      <q-item-label
        caption
        class="text-right"
      >
        <span class="">Date</span>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }

}
</script>

<style lang="scss">

.chat__message{
  background: $message-bg;
  max-width:500px;
}
.chat__message_bg_my{
  background: $message-bg-my;
}

</style>

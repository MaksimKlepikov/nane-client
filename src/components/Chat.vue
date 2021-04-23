<template>
  <div class="q-pl-md row">
    <q-virtual-scroll
      class="fit"
      :items="heavyList"
    >
      <template #default="{ index }">
        <!-- <q-item
          :key="index"
          dense
        >
          <q-item-section>
            <q-item-label>
              #{{ index }} - {{ item.label }}
            </q-item-label>
          </q-item-section>
        </q-item> -->
        <chat-message
          :key="index"
          class="q-my-md"
        />
      </template>
    </q-virtual-scroll>
    <!-- <q-list
      style="width: 100%"
    >
      <q-item-label header>
        Room name
      </q-item-label>
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
      <chat-message class="q-my-md" />
    </q-list> -->
  </div>
</template>

<script>
import ChatMessage from 'components/ChatMessage.vue'

const maxSize = 10000
const heavyList = []

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: 'Option ' + (i + 1)
  })
}
Object.freeze(heavyList)
export default {

  components: {
    ChatMessage
  },
  data () {
    return {
      heavyList
    }
  }
}
</script>

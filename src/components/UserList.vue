<template>
  <q-list
    padding
    separator
  >
    <q-item-label
      header
      class="text-grey-8"
    >
      Accounts
    </q-item-label>
    <q-item
      v-for="user in users"
      :key="user.username"
      v-ripple
      :disable="isNoConnection"
      :active="checkIfUserCurrent(user)"
      clickable
      @click="onUserItemClick(user)"
    >
      <q-item-section
        class="ellipsis"
      >
        <q-item-label
          class="ellipsis"
        >
          {{ user.username }}
        </q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-icon :name="checkIfUserCurrent(user)?'logout':'login'" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  // name: 'ComponentName',
  data () {
    return {}
  },
  computed: {
    ...mapGetters('user', {
      users: 'getUsers',
      currentUser: 'getCurrentUser'
    }),
    ...mapGetters('settings', {
      isNoConnection: 'isNoConnection'
    })
  },
  methods: {
    ...mapActions('user', {
      switchCurrentUserTo: 'switchCurrentUserTo',
      logout: 'logout'
    }),
    checkIfUserCurrent (user) {
      return this.currentUser?.username === user.username
    },
    onUserItemClick (user) {
      if (this.checkIfUserCurrent(user)) {
        return this.logout()
      }
      this.switchCurrentUserTo(user.username)
      this.$emit('loggedin')
    }
  }
}
</script>

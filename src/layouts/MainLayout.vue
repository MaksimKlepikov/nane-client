<template>
  <q-layout view="lHh LpR lFf">
    <q-header class="row no-wrap bg-primary text-white">
      <q-toolbar
        v-if="isNoConnection"
        class="col-auto bg-grey-5"
      >
        <q-toolbar-title>No connection</q-toolbar-title>
        <q-icon
          name="wifi_off"
          size="sm"
        />
      </q-toolbar>
      <q-toolbar :class="{'bg-grey-4':isNoConnection}">
        <q-btn
          v-if="isShowMenuButton"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-btn
          v-if="isShowBackButton"
          flat
          dense
          round
          icon="arrow_back"
          aria-label="Back"
          @click="$router.go(-1)"
        />

        <q-toolbar-title>
          {{ toolbarTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      elevated
      overlay
      no-swipe-open
      no-swipe-close
    >
      <div
        style="height: 110px"
        class="bg-primary q-pa-md text-center"
      >
        <div
          v-if="isLoggedIn"
          class=" row items-center justify-center"
        >
          <div>
            <q-avatar
              class="col-auto"
              color="white"
              text-color="primary"
              icon="person"
            />
          </div>
          <div
            v-if="currentUser"
            class="col-12 ellipsis q-mt-sm text-white text-weight-bold"
          >
            {{ currentUser.username }}
          </div>
        </div>
        <div
          v-else
          class="fit flex items-center justify-center"
        >
          <q-btn
            :disable="isNoConnection"
            rounded
            no-caps
            unelevated
            color="white"
            text-color="primary"
            label="Log In"
            @click="onLogin"
          />
        </div>
      </div>
      <q-scroll-area
        style="height: calc(100% - 110px);"
      >
        <div
          v-if="isLoggedIn"
          class="row q-pa-sm"
        >
          <q-btn
            :disable="isNoConnection"
            rounded
            outline
            no-caps
            unelevated
            class="col-12"
            color="white"
            text-color="primary"
            label="Log In Another Account"
            @click="onLogin"
            @keypress.prevent
          />
        </div>
        <user-list @loggedin="closeLeftDrawer" />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view @ask-login="askLogin" />
    </q-page-container>
    <div
      v-if="leftDrawerOpen"
      class="fixed-full dimmed cursor-pointer"
      @click="closeLeftDrawer"
    />
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import UserList from 'components/UserList.vue'
import LoginForm from 'src/components/forms/LoginForm.vue'

export default {
  name: 'MainLayout',
  components: {
    UserList
  },
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapGetters('user', {
      currentUser: 'getCurrentUser',
      isLoggedIn: 'isLoggedIn'
    }),
    ...mapGetters('settings', {
      isNoConnection: 'isNoConnection'
    }),
    isShowMenuButton () {
      return this.$q.platform.is.desktop || this.$route.name !== 'room'
    },
    isShowBackButton () {
      return this.$q.platform.is.mobile && this.$route.name === 'room'
    },
    toolbarTitle () {
      return this.$route.params.roomId || this.currentUser?.username
    },
    isLogin () {
      return this.$route.path === '/login'
    }
  },
  methods: {
    ...mapActions('user', {
      login: 'login'
    }),
    askLogin () {
      this.openLeftDrawer()
      this.$q.notify({
        message: 'Please Log In',
        position: 'center',
        color: 'primary',
        timeout: 500
      })
    },
    closeLeftDrawer () {
      this.leftDrawerOpen = false
    },
    openLeftDrawer () {
      this.leftDrawerOpen = true
    },
    async onLogin () {
      try {
        const username = await this.openLoginForm()
        await this.login(username)
        this.closeLeftDrawer()
      } catch (e) {
        if (e) { console.error(e) }
      }
    },
    openLoginForm () {
      return new Promise(
        (resolve, reject) =>
          this.$q.dialog({
            component: LoginForm,
            parent: this
          })
            .onOk(resolve)
            .onCancel(reject)
      )
    }
  }
}
</script>

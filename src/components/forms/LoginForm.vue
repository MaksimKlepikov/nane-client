<template>
  <q-dialog
    ref="dialog"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">
          Login
        </div>
      </q-card-section>
      <q-card-section>
        <q-input
          ref="usernameInput"
          v-model="username"
          filled
          autofocus
          label="Username"
          lazy-rules
          :maxlength="$options.usernameMaxLength"
          :rules="[
            val => val && val.length > 0 || 'Please enter the username',
          ]"
          @keydown.enter="onSubmit"
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
          label="Login"
          rounded
          outline
          @click="onSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  usernameMaxLength: 50,
  name: 'LoginForm',
  data () {
    return {
      username: ''
    }
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
      if (this.$refs.usernameInput.validate()) {
        this.$emit('ok', this.username)
        this.hide()
      }
    },

    onCancel () {
      this.hide()
    }
  }
}
</script>

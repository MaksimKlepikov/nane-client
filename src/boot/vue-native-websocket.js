import VueNativeSock from 'vue-native-websocket'

export default async ({ Vue }) => {
  Vue.use(VueNativeSock, process.env.API_WS + '?username=anonymous', {
    connectManually: true,
    reconnection: false,
    format: 'json'
  })
}

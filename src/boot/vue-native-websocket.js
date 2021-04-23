import VueNativeSock from 'vue-native-websocket'

export default async ({ Vue }) => {
  Vue.use(VueNativeSock, process.env.API_WS + '?username=kevrat', {
    reconnection: true,
    format: 'json'
  })
}

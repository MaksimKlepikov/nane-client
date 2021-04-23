
import { Model } from '@vuex-orm/core'

export default class Message extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'messages'

  static fields () {
    return {
      room: this.attr(null),
      text: this.attr(''),
      created: this.attr(null),
      sender: this.attr(null)
    }
  }

  static apiConfig = {
    actions: {
      fetchByRoom (room) {
        return this.get(`rooms/${room}/history`, {
          dataKey: 'data'
        })
      }
    }
  }
}

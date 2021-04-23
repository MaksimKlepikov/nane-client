
import { Model } from '@vuex-orm/core'

import Message from 'src/store/message/model.js'

export default class Room extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'rooms'
  static primaryKey = 'name'

  static fields () {
    return {
      name: this.attr(null),
      messages: this.hasMany(Message, 'room')
    }
  }

  static apiConfig = {
    actions: {
      fetch: {
        method: 'get',
        url: '/rooms',
        dataKey: 'result'
      }
    }
  }
}

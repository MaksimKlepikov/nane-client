
import { Model } from '@vuex-orm/core'

import Message from 'src/store/message/model.js'

export default class User extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'users'
  static primaryKey = 'username'

  static fields () {
    return {
      username: this.attr(null),
      messages: this.hasMany(Message, 'sender.username')
    }
  }
}

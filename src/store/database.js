import VuexORM from '@vuex-orm/core'

import UserModel from './user/model'
import users from './user'
import RoomModel from './room/model'
import rooms from './room'
import MessageModel from './message/model'
import messages from './message'

export default function createDatabase () {
  const database = new VuexORM.Database()
  database.register(UserModel, users)
  database.register(RoomModel, rooms)
  database.register(MessageModel, messages)
  return database
}

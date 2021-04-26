import Vue from 'vue'
import Vuex from 'vuex'

import room from './room'
import message from './message'
import user from './user'
import settings from './settings'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
    modules: {
      room,
      message,
      user,
      settings
    }
  })

  return Store
}
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import createDatabase from './database'

// import example from './module-example'

Vue.use(Vuex)

const database = createDatabase()

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  VuexORM.use(VuexORMAxios, { axios })

  const Store = new Vuex.Store({
    plugins: [VuexORM.install(database)],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}

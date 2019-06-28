// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      /* your options */
      key: 'ayo-rek-detection',
      modules: ['detection', 'device']
    }).plugin(store)
  })
}

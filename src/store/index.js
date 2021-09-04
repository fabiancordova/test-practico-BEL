import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//en datos se guardan los datos de la API países
export default new Vuex.Store({
  state: {
    datos: {},
  },
  mutations: {
    mutPaises(state,datos) {
      state.datos= datos;
    }
  },
  actions: {
    actionsPaises(context,datos) {
      context.commit('mutPaises',datos);
    },
  },
  modules: {
  }
})

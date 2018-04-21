import Vue from 'vue';
import Vuex from 'vuex';

import * as getters from './getters';
import app from './modules/app';
import sound from './modules/sound';
import login from './modules/login';

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  modules: {
    app,
    sound,
    login,
  },
});

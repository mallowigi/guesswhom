/* eslint-disable no-shadow,no-console */

import api from '@/api/app';
import constants from '../mutations';

// initial state
const state = {
  logos: [],
  tempLogos: [],
  currentLogo: {},
  gameFinished: false,
  startTime: new Date().getTime(),
};

const getters = {
  /**
   * Logos after processing
   * @param state
   * @returns {Array|*}
   */
  logos: state => state.logos,
  /**
   * Fetched logos
   * @param state
   * @returns {Array}
   */
  tempLogos: state => state.tempLogos,
  /**
   * The current displayed logo
   * @param state
   * @returns {{}|state.currentLogo}
   */
  currentLogo: state => state.currentLogo,
  /**
   * Whether the game is finished
   * @param state
   * @returns {boolean}
   */
  gameFinished: state => state.gameFinished,
  /**
   * The start time
   * @param state
   * @returns {number | *}
   */
  startTime: state => state.startTime,
};

const actions = {
  /**
   * Fetch logos from the server
   * @param commit
   * @returns {Promise<void>}
   */
  async initializeLogos({ commit }) {
    let { data: tempLogos } = await api.getLogos();
    if (!tempLogos) {
      tempLogos = JSON.parse(window.localStorage.getItem('guesswhom.logos') || '[]');
    }
    // Store in LS
    window.localStorage.setItem('guesswhom.logos', JSON.stringify(tempLogos));

    // Trigger mutation
    commit(constants.TEMP_LOGOS, { tempLogos });
  },

  /**
   * Initializes a new game
   * @param commit
   * @param state
   */
  restartGame({ commit, state }) {
    commit(constants.START);
  },
};

const mutations = {
  /**
   * Update the state's logos
   * @param state
   * @param logos
   */
  [constants.TEMP_LOGOS](state, { tempLogos }) {
    state.tempLogos = tempLogos;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

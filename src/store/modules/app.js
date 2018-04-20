/* eslint-disable no-shadow,no-console */

import api from '@/api/app';
import constants from '../mutations';

// initial state
const state = {
  logos: [],
  tempLogos: [],
  currentLogo: {},
  previousLogo: {},
  choices: [],
  gameFinished: false,
  startTime: new Date().getTime(),
  endTime: 0,
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
   * The previous logo
   * @param state
   * @returns {*}
   */
  previousLogo: state => state.previousLogo,
  /**
   * The list of choices
   * @param state
   * @returns {*}
   */
  choices: state => state.choices,
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
  /**
   * The end time
   * @param state
   * @returns {number}
   */
  endTime: state => state.endTime,
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
    const shuffle = api.shuffle(state.tempLogos);
    const logos = api.generateIds(shuffle);
    const amount = logos.length;
    const currentLogo = logos[0];
    const previousLogo = {};
    const choices = api.getAnswers(logos, amount, currentLogo.id);

    commit(constants.SET_LOGOS, { logos });
    commit(constants.SET_AMOUNT, { amount });
    commit(constants.SET_CURRENT_LOGO, { currentLogo });
    commit(constants.SET_PREVIOUS_LOGO, { previousLogo });
    commit(constants.SET_CHOICES, { choices });
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
  [constants.SET_LOGOS](state, { logos }) {
    state.logos = logos;
  },
  [constants.SET_AMOUNT](state, { amount }) {
    state.amount = amount;
  },
  [constants.SET_CURRENT_LOGO](state, { currentLogo }) {
    state.currentLogo = currentLogo;
  },
  [constants.SET_PREVIOUS_LOGO](state, { previousLogo }) {
    state.previousLogo = previousLogo;
  },
  [constants.SET_CHOICES](state, { choices }) {
    state.choices = choices;
  },
  [constants.START](state) {
    state.gameFinished = false;
    state.startTime = new Date().getTime();
    state.endTime = 0;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

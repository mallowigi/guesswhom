/* eslint-disable no-shadow,no-console */

import api from '@/api/app';
import constants from '../mutations';

// initial state
const state = {
  logos: [],
  tempLogos: [],
  amount: 0,
  currentLogo: {},
  previousLogo: {},
  choices: [],
  gameFinished: false,
  startTime: new Date().getTime(),
  endTime: 0,
  user: null,
  answerCount: 0,
  feedback: false,
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
   * Amount of logos (there is a lot!)
   * @param state
   * @returns {number|*}
   */
  amount: state => state.amount,
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
  /**
   * Connected user
   * @param state
   * @returns {*}
   */
  user: state => state.user,
  /**
   * List of answered questions
   * @param state
   * @returns {number}
   */
  answerCount: state => state.answerCount,
  /**
   * The feedback state
   * @param state
   * @returns {boolean|*}
   */
  feedback: state => state.feedback,
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
   * Increase answer count
   */
  increaseCount({ commit }) {
    commit(constants.INCREASE_COUNT);
  },

  setChoices({ commit, state }) {
    const choices = api.getAnswers(state.logos,
      state.amount,
      state.currentLogo.id,
      state.previousLogo.id);
    commit(constants.SET_CHOICES, { choices });
  },

  /**
   * Change current logo
   * @param commit
   * @param state
   * @param logo
   */
  setCurrentLogo({ commit, state }, logo) {
    commit(constants.SET_PREVIOUS_LOGO, { previousLogo: state.currentLogo });
    commit(constants.SET_CURRENT_LOGO, { currentLogo: logo });
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

  /**
   * Send a finish Game mutation
   * @param commit
   */
  finishGame({ commit }) {
    commit(constants.FINISH);
  },

  /**
   * Set the current user
   * @param commit
   * @param user
   */
  setUser({ commit }, user) {
    commit(constants.SET_USER, { user });
  },

  /**
   *
   * @param commit
   */
  firebaseFeedback({ commit }) {
    commit(constants.FEEDBACK, { feedback: true });
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
  [constants.SET_USER](state, { user }) {
    state.user = user;
  },
  [constants.START](state) {
    state.gameFinished = false;
    state.startTime = new Date().getTime();
    state.endTime = 0;
  },
  [constants.FINISH](state) {
    state.gameFinished = true;
    state.endTime = new Date().getTime();
  },
  [constants.FEEDBACK](state, { feedback }) {
    state.feedback = feedback;
  },
  [constants.INCREASE_COUNT](state) {
    state.answerCount += 1;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

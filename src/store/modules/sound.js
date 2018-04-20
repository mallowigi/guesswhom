/* eslint-disable no-shadow */
import {Howl} from 'howler';
import constants from '../mutations';

const gameEnd = new Howl({
  src: ['../../static/sounds/finish.mp3', '../../static/sounds/finish.ogg'],
  volume: 0.5,
});

const correct = new Howl({
  src: ['../../static/sounds/correct.mp3', '../../static/sounds/correct.ogg'],
  volume: 0.5,
});

const wrong = new Howl({
  src: ['../../static/sounds/gameover.mp3', '../../static/sounds/gameover.ogg'],
  rate: 1.3,
  volume: 0.5,
});

const state = {
  sound: window.localStorage.getItem('sound') ? JSON.parse(window.localStorage.getItem('sound')) : true,
};

const getters = {
  sound: state => state.sound,
};

const actions = {
  playSound({ state }, type) {
    if (state.sound) {
      switch (type) {
        case 'finish':
          gameEnd.play();
          break;
        case 'fail':
          wrong.play();
          break;
        case 'correct':
          correct.play();
          break;
        default:
          break;
      }
    }
  },
  toggleSound({ commit }) {
    commit(constants.TOGGLE_SOUND);
  },
};

const mutations = {
  [constants.TOGGLE_SOUND](state) {
    state.sound = !state.sound;
    window.localStorage.setItem('sound', state.sound);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

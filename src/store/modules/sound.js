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
  volume: 0.5,
});

const start = new Howl({
  src: ['../../static/sounds/start.mp3', '../../static/sounds/start.ogg'],
  volume: 0.5,
});

const state = {
  sound: window.localStorage.getItem('sound') ? JSON.parse(window.localStorage.getItem('sound')) : true,
};

const getters = {
  sound: state => state.sound,
};

const actions = {
  playFinish() {
    gameEnd.play();
  },

  playFail() {
    wrong.play();
  },

  playCorrect() {
    correct.play();
  },

  playStart() {
    start.play();
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

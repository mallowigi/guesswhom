// initial state
const state = {
  currentLogo: {},
  gameFinished: false,
  startTime: new Date().getTime(),
};

const getters = {
  currentLogo: state => state.currentLogo,
  gameFinished: state => state.gameFinished,
  startTime: state => state.startTime,
};

export default {
  state,
  getters,
};

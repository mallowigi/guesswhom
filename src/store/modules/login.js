/* eslint-disable no-shadow */
import * as firebase from 'firebase';
import 'firebase/auth';
import constants from '../mutations';

const config = {
  apiKey: 'AIzaSyC940dirP-cnec8FFczul_ClGVmMOwiPtU',
  authDomain: 'guesswhom-dc73b.firebaseapp.com',
  databaseURL: 'https://guesswhom-dc73b.firebaseio.com',
  projectId: 'guesswhom-dc73b',
  storageBucket: 'guesswhom-dc73b.appspot.com',
  messagingSenderId: '911764484876',
};

const state = {
  firebaseConfig: config,
  highScores: [],
};

const getters = {
  firebaseConfig: state => state.firebaseConfig,
  highScores: state => state.highScores,
};

/**
 * Only save if the new score is better than the old one
 * @param newScore
 * @param oldScore
 */
function shouldSaveNewScore(newScore, oldScore) {
  // The user could not answer more than one answer per second, that's cheating!
  if ((newScore.endTime - newScore.startTime) <= newScore.answerCount * 1000) {
    return false;
  }
  // eslint-disable-next-line max-len
  const betterTime = (newScore.endTime - newScore.startTime) <= (oldScore.endTime - oldScore.startTime);
  if (newScore.answerCount > oldScore.answerCount) {
    return true;
  } else if (newScore.answerCount === oldScore.answerCount && betterTime) {
    return true;
  }
  return false;
}

const actions = {
  /**
   * Init Firebase to save users upon authentication
   */
  initFirebase({ dispatch, state }) {
    if (!firebase.apps.length) {
      firebase.initializeApp(state.firebaseConfig);
    }

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // Create an entry for the user
        await firebase.database().ref(`/users/${user.uid}`).set({
          name: user.displayName,
          email: user.email,
          photo_url: user.photoURL,
        });

        dispatch('setUser', user);
        dispatch('firebaseFeedback');
      } else {
        dispatch('firebaseFeedback');
      }
    });
  },

  /**
   * Save score to firebase
   */
  async saveScore({ rootState }) {
    const { app } = rootState;
    if (app.user) {
      const name = app.user.displayName || app.user.email.substring(0, app.user.email.indexOf('@'));
      const score = {
        answerCount: app.answerCount,
        amount: app.amount,
        startTime: app.startTime,
        endTime: app.endTime,
        name,
      };

      // Get previous score if there is
      const snapshot = await firebase.database().ref(`/scores/${app.user.uid}`).once('value');
      const previousScore = snapshot.val();
      if (!previousScore) {
        firebase.database().ref(`/scores/${app.user.uid}`).set(score);
      } else if (shouldSaveNewScore(score, previousScore)) {
        firebase.database().ref(`/scores/${app.user.uid}`).set(score);
      }
    }
  },

  /**
   * Logs with Github
   */
  async login() {
    await firebase.auth().signInWithRedirect(new firebase.auth.GithubAuthProvider());
  },

  /**
   * Logs out
   */
  async logout({ dispatch }) {
    await firebase.auth().signOut();
    dispatch('setUser', null);
  },

  async getHighScores({ commit }) {
    const snapshot = await firebase.database().ref('/scores')
    .orderByChild('answerCount')
    .limitToLast(10)
    .once('value');

    if (snapshot.val()) {
      // iterate over firebase entries
      const results = snapshot.val();
      const highScores = Object.values(results);
      commit(constants.SET_HIGH_SCORES, { highScores });
    }
  },

};

const mutations = {
  [constants.SET_HIGH_SCORES](state, { highScores }) {
    state.highScores = highScores;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

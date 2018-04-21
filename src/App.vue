<template>
  <div id="app">
    <progress-bar></progress-bar>
    <sound-toggle></sound-toggle>
    <!--<login-view></login-view>-->
    <router-view v-on:save-score="saveScore"></router-view>
    <credits class="credits"></credits>
  </div>
</template>

<script>
  import * as firebase from 'firebase';
  import 'firebase/auth';
  import {mapActions, mapGetters} from 'vuex';
  import ProgressBar from './components/ProgressBar';
  import SoundToggle from './components/SoundToggle';
  import LoginView from './components/LoginView';
  import Credits from './components/Credits';

  const config = {
    apiKey: 'AIzaSyC940dirP-cnec8FFczul_ClGVmMOwiPtU',
    authDomain: 'guesswhom-dc73b.firebaseapp.com',
    databaseURL: 'https://guesswhom-dc73b.firebaseio.com',
    projectId: 'guesswhom-dc73b',
    storageBucket: 'guesswhom-dc73b.appspot.com',
    messagingSenderId: '911764484876',
  };

  export default {
    name: 'App',
    components: {
      ProgressBar,
      SoundToggle,
      LoginView,
      Credits,
    },
    created() {
      this.initFirebase();

      if (this.route.path !== '/') {
        this.$router.push('/');
      }
    },
    computed: {
      ...mapGetters([
        'user',
        'answerCount',
        'amount',
        'startTime',
        'endTime',
        'route',
        'routePath',
      ]),
    },
    methods: {
      ...mapActions([
        'setUser',
        'firebaseFeedback',
      ]),
      /**
       * Init Firebase to save users upon authentication
       */
      initFirebase() {
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
        }

        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            // Create an entry for the user
            await firebase.database().ref(`/users/${user.uid}`).set({
              name: user.displayName,
              email: user.email,
              photo_url: user.photoURL,
            });

            this.setUser(user);
            this.firebaseFeedback();
          } else {
            this.firebaseFeedback();
          }
        });
      },
      /**
       * Save score to firebase
       */
      async saveScore() {
        if (this.user) {
          const name = this.user.displayName || this.user.email.substring(0, this.user.email.indexOf('@'));
          const score = {
            answerCount: this.answerCount,
            amount: this.amount,
            startTime: this.startTime,
            endTime: this.endTime,
            name,
          };

          // Get previous score if there is
          const snapshot = await firebase.database().ref(`/scores/${this.user.uid}`).once('value');
          const previousScore = snapshot.val();
          if (!previousScore) {
            firebase.database.ref(`/scores/${this.user.uid}`).set(score);
          } else if (this.shouldSaveNewScore(score, previousScore)) {
            firebase.database.ref(`/scores/${this.user.uid}`).set(score);
          }
        }
      },
    },

    /**
     * Only save if the new score is better than the old one
     * @param newScore
     * @param oldScore
     */
    shouldSaveNewScore(newScore, oldScore) {
      // The user could not answer more than one answer per second, that's cheating!
      if ((newScore.endTime - newScore.startTime) <= this.answerCount * 1000) {
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
    },
  };
</script>

<style>
  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #app {
    margin-top: -50px;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-height: 500px) {
    .credits {
      display: none;
    }

    #app {
      margin-top: 0px;
    }
  }

  @media screen and (max-width: 447px) {
    .credits {
      display: none;
    }

    #app {
      margin-top: 0px;
    }
  }
</style>

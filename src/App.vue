<template>
  <div id="app">
    <progress-bar></progress-bar>
    <sound-toggle></sound-toggle>
    <profile-panel v-on:login="login" v-on:logout="logout"></profile-panel>
    <router-view v-on:save-score="saveScore"></router-view>
    <credits class="credits"></credits>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import ProgressBar from './components/ProgressBar';
  import SoundToggle from './components/SoundToggle';
  import ProfilePanel from './components/ProfilePanel';
  import Credits from './components/Credits';

  export default {
    name: 'App',
    components: {
      ProgressBar,
      SoundToggle,
      ProfilePanel,
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
        'firebaseConfig',
      ]),
    },
    methods: {
      ...mapActions([
        'setUser',
        'firebaseFeedback',
        'initFirebase',
        'saveScore',
        'login',
        'logout',
      ]),
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

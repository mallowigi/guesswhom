<template>
  <div class="container">
    <h1>Guess the JavaScript Framework!</h1>
    <h2>You know there are too much frameworks when there is a game for it!</h2>
    <RippleButton class="button"
                  text="Start Game"
                  v-on:button-click="startGame"
    />
    <RippleButton class="button"
                  text="High Scores"
                  v-on:button-click="ranking"
    />
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import RippleButton from './RippleButton';

  export default {
    name: 'Splash',
    components: {
      RippleButton,
    },
    data() {
      return {
        gameStarted: false,
      };
    },
    created() {
      this.playStart();
    },
    computed: {
      ...mapGetters([]),
    },
    methods: {
      ...mapActions([
        'restartGame',
        'playStart',
      ]),
      startGame() {
        this.gameStarted = true;
        this.$router.push('/start');
      },
      ranking() {
        this.$router.push('/ranking');
      },
    },
  };
</script>

<style scoped>
  .container {
    max-width: 600px;
  }

  h2 {
    color: #008597;
  }

  h1, p {
    color: #66BB6A;
    margin: 0;
  }

  .button {
    margin: 0 auto 20px;
    display: block;
  }
</style>

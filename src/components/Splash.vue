<template>
  <div class="container">
    <div class="logo-container">
      <transition name="bounce">
        <div class="logo" v-if="show">
        </div>
      </transition>
    </div>

    <h1>Guess the <span class="foo">JavaScript</span> Framework!</h1>
    <h2>You know there are too many frameworks when there is a game for it!</h2>
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
        show: false,
        gameStarted: false,
      };
    },
    created() {
      this.playStart();
      setTimeout(() => { this.show = true; }, 1000);
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
  .foo {
    color: #ffcc00;
    font-style: italic;
  }

  .logo-container {
    width: 400px;
    height: 400px;
    display: block;
    margin: auto;
  }

  .logo {
    width: 400px;
    height: 400px;
    display: block;
    background: url('../../static/frameworks.png') no-repeat;
    background-size: cover;
    margin: auto;
    clip-path: circle(150px at center);
  }

  .container {
    max-width: 600px;
  }

  h2 {
    color: #008597;
    padding: 0 10px;
  }

  h1, p {
    color: #66BB6A;
    margin: 0;
  }

  .button {
    margin: 0 auto 20px;
    display: block;
  }

  .bounce-enter-active {
    animation: bounce-in 2s;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    20% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }

</style>

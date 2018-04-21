<template>
  <div>
    <h2>
      <transition name="highlight">
        <span :key="answerCount">{{answerCount}}</span>
      </transition>
      / {{amount}}
    </h2>

    <js-logo v-if="!gameFinished"></js-logo>
    <ui-options v-if="!gameFinished" v-on:check-answer="checkAnswer"></ui-options>
    <result-page v-if="gameFinished"></result-page>

    <div class="flex restart">
      <router-link to="/">
        <h4>
          <svg fill="#FFFFFF" height="24" viewBox="0 0 24 16" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Restart Game
        </h4>
      </router-link>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import JsLogo from './JsLogo';
  import UiOptions from './UiOptions';
  import ResultPage from './ResultPage';

  export default {
    name: 'Game',
    components: {
      JsLogo,
      UiOptions,
      ResultPage,
    },
    computed: {
      ...mapGetters([
        'currentLogo',
        'gameFinished',
        'logos',
        'answerCount',
        'amount',
      ]),
    },
    methods: {
      ...mapActions([
        'initializeLogos',
        'restartGame',
        'finishGame',
        'increaseCount',
        'setCurrentLogo',
        'setChoices',
        'playFinish',
        'playCorrect',
        'playFail',
        'playStart',
      ]),
      /**
       * Check answer and move to the next question or fail/finish
       * @param id
       */
      checkAnswer(id) {
        if (this.currentLogo.id === id) {
          this.increaseCount();

          if (this.answerCount === this.amount) {
            this.playFinish();
            this.finishGame();
            this.$emit('save-score');
          } else {
            this.playCorrect();
            this.setCurrentLogo(this.logos[this.answerCount]);
            this.setChoices();
          }
        } else {
          this.playFail();
          this.finishGame();
          this.$emit('save-score');
        }
      },
    },
    async created() {
      await this.initializeLogos();
      this.restartGame();
    },
  };
</script>

<style scoped>
  h4, h2 {
    color: whitesmoke;
  }

  a {
    text-decoration: none;
  }

  .restart {
    position: absolute;
    bottom: 50px;
    left: 0;
    right: 0;
  }

  .highlight-enter-active {
    transition: color 3s ease;
  }

  .highlight-enter,
  .highlight-leave-to {
    /*color: #ffcc00;*/
    color: #ffcc00;
  }
</style>

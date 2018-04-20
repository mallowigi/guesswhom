<template>
  <div>
    <js-logo v-if="!gameFinished"></js-logo>
    <ui-options v-if="!gameFinished" v-on:check-answer="checkAnswer"></ui-options>
    <result-page v-if="gameFinished"></result-page>
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
      ]),
      checkAnswer(id) {
        if (this.currentLogo.id === id) {
          this.increaseCount();

          if (this.answerCount === this.amount) {
            this.finishGame();
            this.$emit('save-score');
          } else {
            this.setCurrentLogo(this.logos[this.answerCount]);
            this.setChoices();
          }
        } else {
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

</style>

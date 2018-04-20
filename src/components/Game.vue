<template>
  <div>
    <js-logo v-if="!gameFinished"></js-logo>
    <ui-options v-if="!gameFinished" v-on:check-answer="checkAnswer"></ui-options>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import JsLogo from './JsLogo';
  import UiOptions from './UiOptions';

  export default {
    name: 'Game',
    components: {
      JsLogo,
      UiOptions,
    },
    computed: {
      ...mapGetters([
        'currentLogo',
        'gameFinished',
      ]),
    },
    methods: {
      ...mapActions([
        'initializeLogos',
        'restartGame',
        'finishGame',
      ]),
      checkAnswer(id) {
        if (this.currentLogo.id === id) {
          // go to next logo
        } else {
          // show score
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

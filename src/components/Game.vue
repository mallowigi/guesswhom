<template>
  <div>
    <js-logo v-if="!gameFinished"></js-logo>
    <ui-options v-if="!gameFinished"></ui-options>
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
        'gameFinished',
      ]),
    },
    methods: {
      ...mapActions([
        'initializeLogos',
        'restartGame',
      ]),
    },
    async created() {
      await this.initializeLogos();
      this.restartGame();
    },
  };
</script>

<style scoped>

</style>

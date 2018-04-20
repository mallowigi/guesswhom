<template>
  <div>
    <js-logo v-if="!gameFinished"></js-logo>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import JsLogo from './JsLogo';

  export default {
    name: 'Game',
    components: {
      JsLogo,
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

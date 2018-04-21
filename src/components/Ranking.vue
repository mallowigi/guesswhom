<template>

</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Ranking',
    created() {
      this.initFirebase();

      if (this.route.path !== '/') {
        this.$router.push('/');
      }
    },
    computed: {
      ...mapGetters([
        'user',
      ]),
    },
    methods: {
      getHighScores() {

      },
    },
  };
</script>

<style scoped>

</style>

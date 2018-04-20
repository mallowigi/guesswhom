<template>
  <div class="container" id="progress">
    <div class="progress" v-bind:style="{width: progress + '%'}"></div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'ProgressBar',
    computed: {
      ...mapGetters([
        'answerCount',
        'amount',
      ]),
      progress() {
        return (this.answerCount / this.amount) * 100 || 0;
      },
    },
  };
</script>

<style scoped>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .progress {
    background-color: #66BB6A;
    height: 4px;
    transition: width 1s;
  }
</style>

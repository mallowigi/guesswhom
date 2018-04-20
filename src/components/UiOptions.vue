<template>
  <div class="container">
    <div class="flex-container">
      <RippleButton class="button" v-for="option in choices" v-bind:key="option.name"
                    :id="option.id" :text="option.name"/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import RippleButton from './RippleButton';

  export default {
    name: 'UiOptions',
    components: { RippleButton },
    computed: {
      ...mapGetters([
        'choices',
      ]),
    },
  };
</script>

<style scoped>
  .container {
    max-width: 600px;
  }

  .flex-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
</style>

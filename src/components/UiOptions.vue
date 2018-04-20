<template>
  <div class="container">
    <div class="flex-container">
      <RippleButton class="button" v-for="option in choices" v-bind:key="option.name"
                    :id="option.id" :text="option.name"
                    v-on:button-click="checkAnswer"
      />
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
    methods: {
      /**
       * Send an event upwards
       * @param id
       */
      checkAnswer(id) {
        this.$emit('check-answer', id);
      },
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

  .button {
    margin-top: 20px;
  }

  .button:nth-child(2n) {
    margin-left: 32px;
  }

  @media (max-width: 447px) {
    .button {
      width: 100%;
    }

    .button {
      margin-left: 32px !important;
      margin-right: 32px !important;
    }
  }
</style>

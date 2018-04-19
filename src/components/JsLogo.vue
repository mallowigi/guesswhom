<template>
  <div class="container">
    <img class="logo" v-bind:src="logoUrl" v-if="show"
         v-bind:style="{ height: size + 'px', width: size + 'px' }"
         v-bind:alt="altContext">
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'JsLogo',

    data() {
      return {
        show: false,
        prod: process.env.NODE_ENV === 'production',
      };
    },

    props: {
      size: {
        type: Number,
        default: 100,
      },
    },

    computed: {
      // Create getters for the global state currentLogo and gameFinished
      ...mapGetters({
        currentLogo: 'currentLogo',
        gameFinished: 'gameFinished',
      }),
      logoUrl() {
        if (!this.currentLogo.name) {
          return null;
        }

        return `../static/logos/${this.prod ? this.currentLogo.uuid : this.currentLogo.name.toLowerCase()}.png`;
      },
      altContext() {
        return this.gameFinished ? 'Learn more about this JavaScript Library' : 'Guess the logo';
      },
    },

    mounted() {
      if (this.logoUrl) {
        this.show = true;
      }
    },

    watch: {
      /**
       * Watch for logoUrl to hide logos in between
       * @param val
       */
      logoUrl(val) {
        this.show = false;
        setTimeout(() => {
          this.show = true;
        }, 1);
      },
    },
  };
</script>

<style scoped>

</style>

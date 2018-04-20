<template>
  <div class="container">
    <transition name="fade">
      <img class="logo"
           v-bind:src="logoUrl"
           v-if="show"
           v-bind:style="{ height: size + 'px', width: size + 'px' }"
           v-bind:alt="altContext">
    </transition>
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
      /** Returns the current logo filename */
      logoUrl() {
        if (!this.currentLogo.name) {
          return null;
        }

        return `../static/logos/${this.prod ? this.currentLogo.uuid : this.currentLogo.name.toLowerCase()}.png`;
      },
      /** Returns the current logo alt */
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
       */
      logoUrl() {
        this.show = false;
        setTimeout(() => {
          this.show = true;
        }, 1);
      },
    },
  };
</script>

<style scoped>
  .container {
    margin-top: 32px;
    margin-bottom: 32px;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.75s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

  img {
    z-index: 1;
    position: relative;
  }
</style>

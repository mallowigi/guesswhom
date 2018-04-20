<template>
  <button class="ripple-button" ripple v-on:mousedown="onDown" v-on:click="onClick">
    <div class="ripple--container">
    </div>
    {{text}}
  </button>
</template>
<script>
  /* eslint-disable max-len */

  export default {
    name: 'RippleButton',
    props: ['text', 'id'],

    /**
     * Cleanup after click
     */
    created() {
      setTimeout(() => this.$el.addEventListener('mouseup', this.debounce(this.cleanup, 2000)));
    },

    methods: {
      /**
       * Show ripple
       */
      onDown(e) {
        this.showRipple(e);
        e.preventDefault();
      },

      /**
       * Send event upwards
       */
      onClick() {
        this.$emit('button-click', this.id);
      },
      /**
       * How to create a ripple:
       * 1. Create a container div with position absolute and 0 in all coord, so it takes all width and height
       * 2. The width and height should be the same as the button so it would expand to the whole width
       * 3. Compute the origin of the rippling effect. This should be the mouse click event, but:
       * 4. We want to place ourselves at the center of the ripple, so we need to remove half the size to x and y
       * 5. At the end we simply assign a top and left position to the new ripple, and let the animation expand
       * 6. The animation should start from scale(0) to scale(2) and disappear through opacity:0
       *
       * @param e
       */
      showRipple(e) {
        // The originator of the event
        let button;
        if (e.target.tagName === 'BUTTON') {
          button = e.target; // firefox
        } else {
          button = e.target.parentNode;
          if (button.tagName === 'DIV') {
            button = button.parentNode;
          }
        }

        const rippler = document.createElement('span');

        // Find ripple coordinates
        const pos = button.getBoundingClientRect();
        const size = button.offsetWidth;
        const x = e.pageX - pos.left - (size / 2); // center the ripple
        const y = e.pageY - pos.top - (size / 2);
        const style = `top: ${y}px; left: ${x}px; height: ${size}px; width: ${size}px`;

        rippler.setAttribute('style', style);
        button.querySelector('.ripple--container').appendChild(rippler);
        return rippler;
      },

      /**
       * Remove ripple
       * @param e
       */
      cleanup(e) {
        let rippleContainer;
        if (e.target.tagName === 'SPAN') {
          rippleContainer = e.target.parentNode;
        } else if (e.target.tagName === 'BUTTON') {
          rippleContainer = e.target.firstChild;
        }

        while (rippleContainer.firstChild) {
          rippleContainer.removeChild(rippleContainer.firstChild);
        }
      },

      /**
       * Utility to debounce a function
       * @param fn
       * @param delay
       * @returns {function(...[*]): (number | Object | *)}
       */
      debounce(fn, delay) {
        let debounced = null; // This will contain the debounced function
        return function debounceFn(...args) {
          // Clear the previous timeout and register a new timeout
          clearTimeout(debounced);
          debounced = setTimeout(() => fn.apply(this, args), delay);
          return debounced;
        };
      },
    },
  };
</script>
<style>
  .ripple-button {
    width: 200px;
    background: transparent;
    color: #66BB6A;
    text-align: center;
    text-transform: uppercase;
    font-size: 16px;
    border: 1px solid #66BB6A;
    border-radius: 8px;
    padding: 20px;
    outline: none;
    cursor: pointer;
  }

  .ripple-button:focus {
    outline: 2px solid #66BB6A !important;
  }

  /* Ripple container */
  [ripple] {
    position: relative;
    overflow: hidden;
  }

  [ripple] .ripple--container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
  }

  [ripple] .ripple--container span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    background: #4CAF50;
    opacity: 0.75;
    animation: ripple 1000ms;
  }

  @-moz-keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }

  @-webkit-keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }

  @-o-keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
</style>

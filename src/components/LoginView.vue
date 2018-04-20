<template>
  <!-- eslint-disable max-len -->
  <div class="login-root" v-if="feedback">
    <button type="button" name="button" v-on:click="login" v-if="!user">Sign in with Github</button>
    <a href="#" v-on:click="opened" v-if="user">
      <img :src="user.photoUrl" :alt="user.displayName">
      <svg fill="#66BB6A" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10l5 5 5-5z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </a>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'LoginView',
    data() {
      return {
        opened: false,
      };
    },
    computed: {
      ...mapGetters([
        'user',
        'feedback',
      ]),
    },
    methods: {
      openDropdown(e) {
        e.preventDefault();
        if (!this.opened) {
          document.addEventListener('click', this.dropdownAction);
          window.setTimeout(() => { this.opened = true; });
        }
      },
      dropdownAction(e) {
        if (typeof e.target.className === 'object' || e.target.className.indexOf('dropdown') < 0) {
          this.opened = false;
        }
      },
      closeDropdown() {
        this.opened = false;
      },
      login() {
        this.$emit('login');
      },
      logout() {
        this.$emit('logout');
      },
    },
  };
</script>

<style scoped>
  .login-root {
    position: absolute;
    top: 0;
    right: 75px;
  }

  button {
    width: 140px;
    background-color: #000;
    color: #66BB6A;
    text-align: center;
    text-transform: uppercase;
    font-size: 10px;
    border: 1px solid #66BB6A;
    border-radius: 8px;
    padding: 15px;
    outline: none;
    cursor: pointer;
    margin: 8px;
  }
</style>

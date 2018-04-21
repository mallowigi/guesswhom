<template>
  <!-- eslint-disable max-len -->
  <div class="login-root" v-if="feedback">
    <button type="button" name="button" v-on:click="login" v-if="!user">Sign in with Github</button>

    <!-- Dropdown -->
    <a href="#" v-on:click="openDropdown" v-if="user">
      <img :src="user.photoURL" :alt="user.displayName">
      <svg class="caret" fill="#66BB6A" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 10l5 5 5-5z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>
    </a>

    <div class="menu-content" v-if="opened && user">
      <div class="dropdown-menu">
        <div class="dropdown-header">
          Signed in as <strong>{{user.displayName || user.email || 'Anonymous'}}</strong>
        </div>

        <div class="dropdown-divider"></div>

        <router-link class="dropdown-item" to="/ranking" v-on:click.native="closeDropdown">High Scores</router-link>
        <router-link class="dropdown-item" to="/" v-on:click.native="closeDropdown">Restart</router-link>

        <div class="dropdown-divider"></div>

        <a href="#" class="dropdown-item" v-on:click="logout">Sign out</a>
        <a href="https://github.com/mallowigi/guesswhom" class="dropdown-item" target="_blank">Github</a>

      </div>
    </div>
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
    watch: {
      /**
       * Remove listener on document when the dropdown is not opened
       */
      opened(value) {
        if (!value) {
          document.removeEventListener('click', this.dismissDropdown);
        }
      },
    },
    computed: {
      ...mapGetters([
        'user',
        'feedback',
        'routePath',
      ]),
    },
    methods: {
      /**
       * Open the dropdown
       */
      openDropdown(e) {
        e.preventDefault();
        if (!this.opened) {
          // Close the dropdown on clicking the document
          document.addEventListener('click', this.dismissDropdown);
          window.setTimeout(() => { this.opened = true; });
        }
      },
      /**
       * Open the dropdown only when pressing the menu
       * @param e
       */
      dismissDropdown(e) {
        if (typeof e.target.className === 'object' || e.target.className.indexOf('dropdown') < 0) {
          this.opened = false;
        }
      },
      /**
       * Close the dropdown
       */
      closeDropdown() {
        this.opened = false;
      },
      /**
       * Login action
       */
      login() {
        this.$emit('login');
      },
      /**
       * Logout action
       */
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

  button:focus {
    outline: 2px solid #66BB6A !important;
  }

  img {
    width: 30px;
    height: 30px;
    margin: 8px 0;
    border-radius: 5px;
  }

  a {
    text-decoration: none;
  }

  .caret {
    margin-bottom: 9px;
  }

  .dropdown-menu {
    background: #fff;
    width: 180px;
    background-clip: padding-box;
    padding-top: 5px;
    padding-bottom: 5px;
    border-radius: 4px;
    margin-right: 8px;
    text-align: left;
    font-size: 14px;
    border: 1px solid rgba(128, 117, 117, 0.42);
    z-index: 2;
    position: absolute;
    right: 0;
    left: auto;
    top: 100%;
  }

  .dropdown-menu::after {
    content: '';
    display: inline-block;
    border-bottom-color: #fff;
    position: absolute;
    top: -14px;
    right: 27px;
    left: auto;
    border: 7px solid transparent;
  }

  .dropdown-header {
    padding: 4px 15px;
    color: #586069;
  }

  .dropdown-item {
    display: block;
    color: #24292e;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 4px 10px 4px 15px;
  }

  .dropdown-item:hover {
    color: #fff;
    text-decoration: none;
    background-color: #66BB6A;
  }

  .dropdown-divider {
    height: 1px;
    margin: 8px 1px;
    background-color: #e1e4e8;
  }

  .dropdown-name {
    white-space: nowrap;
  }

  @media screen and (max-width: 447px) {
    .login-root {
      right: 0;
    }

    button {
      width: 70px;
      padding: 10px;
    }
  }
</style>

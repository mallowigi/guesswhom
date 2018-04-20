<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  // import * as firebase from 'firebase';
  // import 'firebase/auth';

  // const config = {
  //   apiKey: 'AIzaSyC940dirP-cnec8FFczul_ClGVmMOwiPtU',
  //   authDomain: 'guesswhom-dc73b.firebaseapp.com',
  //   databaseURL: 'https://guesswhom-dc73b.firebaseio.com',
  //   projectId: 'guesswhom-dc73b',
  //   storageBucket: '',
  //   messagingSenderId: '911764484876',
  // };

  export default {
    name: 'App',
  };
</script>

<style>
  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #app {
    margin-top: -50px;
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-height: 500px) {
    .credits {
      display: none;
    }

    #app {
      margin-top: 0px;
    }
  }

  @media screen and (max-width: 447px) {
    .credits {
      display: none;
    }

    #app {
      margin-top: 0px;
    }
  }
</style>

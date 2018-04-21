<template>
  <div class="container">
    <h1 v-bind:class="{'-long': insult.length > 50}">{{insult}}</h1>
    <h2>{{answerCount}} / {{amount}}</h2>
    <button class="ripple-button button" v-on:click="restartGame">
      Restart
    </button>

    <div class="suggestion">
      <a v-bind:href="currentLogo.url" target="_blank">
        <js-logo :size="55"></js-logo>
      </a>
      <p>
        I am
        <a v-bind:href="currentLogo.url" target="_blank"><strong>{{currentLogo.name}}!</strong></a>
        Click me to learn more.
      </p>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import JsLogo from './JsLogo';

  export default {
    name: 'ResultPage',
    components: {
      JsLogo,
    },
    computed: {
      ...mapGetters([
        'answerCount',
        'amount',
        'currentLogo',
      ]),
      /**
       * Return a random insult
       * @returns {string}
       */
      insult() {
        const progress = (this.answerCount / this.amount) * 100 || 0;
        if (progress < 1) {
          return 'Do you even JavaScript bro?';
        } else if (progress >= 50) {
          return 'You rule at JavaScript! Now go back to work!';
        }

        const count = this.insults.length;
        const random = Math.floor(Math.random() * count);
        return this.insults[random];
      },
    },
    methods: {
      ...mapActions([
        'restartGame',
      ]),
    },
    data() {
      return {
        insults: [
          'Why don\'t you go back to your desk and tail call yourself?',
          'I never believed in chaos theory until I saw your variable naming convention!',
          'Your commit is writing checks your merge can\'t cash.',
          'Your code, just like C. Has no class!',
          'Your coding methods are so backwards they\'ve added it to the school curriculum in Texas!',
          'Your code runs so slow your data brings sleeping bags to camp-out in the cache lines.',
          'More unit tests? No! What your code needs is petrol and a match.',
          'Imagine an egg hitting a concrete pavement, that\'s how hard-wired, inflexible and brittle your code is.',
          'Don\'t worry about it, I\'ll get someone technical to do this.',
          'You\'re slower than a Java app.',
          'You are one tab level off.',
          'Your code looks as though you have been playing bingo with anti-patterns.',
          'Your code is so wretched, that hard disks add it to their bad block lists.',
          'Clean, clear, and under control; three things that will never be said about your code.',
          'By popular demand, your code backup is in /dev/null/.',
          'Your webpages only render in IE 5.5.',
          '*Knock, knock* "Who\'s there?" *long pause* Your init method.',
          'There may be no I in TEAM, but I can\'t spell B GS, without U.',
          'If Perl scripts could carry coffee around, I could replace you with a one-liner.',
        ],
      };
    },
  };
</script>

<style scoped>
  .container {
    max-width: 600px;
    margin-top: 80px;
  }

  h2 {
    color: #008597;
  }

  h1, p {
    color: #66BB6A;
    margin: 0;
  }

  .button {
    margin: 0 auto 20px;
    display: block;
  }

  .ranking-link > h3 {
    margin: 0;
  }

  .ranking-link,
  .suggestion a {
    text-decoration: none;
    color: #66BB6A;
  }

  .ranking-link:hover,
  .suggestion a:hover {
    text-decoration: underline;
  }

  .suggestion a div {
    margin: 20px;
  }

  @media screen and (max-width: 447px) {
    .long-insult {
      font-size: 22px;
    }

    .custom-tweet-button, .custom-github-button {
      margin: 0.5em auto;
    }
  }

  @media screen and (min-width: 448px) and (max-width: 546px) {
    .long-insult {
      font-size: 25px;
    }
  }

  @media screen and (max-width: 620px) {
    .container {
      margin-left: 16px;
      margin-right: 16px;
    }
  }
</style>

<template>
  <div class="container">
    <h1 v-bind:class="{'-long': insult.length > 50}">{{insult}}</h1>
    <h2>{{answerCount}} / {{amount}}</h2>

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
  import {mapGetters} from 'vuex';
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
        } else if (progress >= 100) {
          return 'Congrats! Now go back to work';
        }

        const count = this.insults.length;
        const random = Math.floor(Math.random() * count);
        return this.insults[random];
      },
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

</style>

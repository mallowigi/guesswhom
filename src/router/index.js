import Vue from 'vue';
import Router from 'vue-router';

import App from '@/App';
import Game from '@/components/Game';
import Splash from '@/components/Splash';
// import Ranking from '@/components/Ranking';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    component: App,
    children: [{
      path: '',
      component: Splash,
    }, {
      path: '/start',
      component: Game,
    }],
  }],
});

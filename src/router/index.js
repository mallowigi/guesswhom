import Vue from 'vue';
import Router from 'vue-router';

import App from '@/App';
import Game from '@/components/Game';
import Splash from '@/components/Splash';

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

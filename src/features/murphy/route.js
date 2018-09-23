// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  WelcomePage,
  CounterPage,
  IntelipostListPage,
  Layout,
} from './';

export default {
  path: 'murphy',
  name: 'Murphy',
  component: Layout,
  childRoutes: [
    { path: '', name: 'Welcome page', component: WelcomePage },
    { path: 'counter', name: 'Counter page', component: CounterPage },
    { path: 'intelipost', name: 'Intelipost list page', component: IntelipostListPage },
  ],
};

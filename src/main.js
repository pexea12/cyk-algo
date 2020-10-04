import { createApp } from 'vue'

import App from './App.vue'
import 'bulma/css/bulma.css';

import {
  stateSymbol,
  createState,
} from './store';

import {
  version,
} from '../package';


console.log('Version', version);

const app = createApp(App);
app.provide(stateSymbol, createState());
app.mount('#app')

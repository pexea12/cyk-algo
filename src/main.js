import { createApp } from 'vue'

import App from './App.vue'
import 'bulma/css/bulma.css';

import {
  storeSymbol,
  createStore,
} from './store';

import {
  version,
} from '../package';


console.log('Version', version);

const app = createApp(App);
app.provide(storeSymbol, createStore());
app.mount('#app')

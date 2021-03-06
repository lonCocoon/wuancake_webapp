/**
 * @file entry
 * @author tim760255458(760255458@qq.com)
 */

import Vue from 'vue';
import Meta from 'vue-meta';
import FastClick from 'fastclick'
import VueLocalStorage from 'vue-localstorage'

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';
import Toast from '../components/Toast'

// import 'vue2-animate/dist/vue2-animate.min.css'

Vue.use(Meta);
Vue.use(VueLocalStorage);
Vue.use(Toast);

FastClick.attach(document.body)

Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}

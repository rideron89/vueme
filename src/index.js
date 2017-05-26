import axios from 'axios'
import Vue from 'vue'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'

import './../node_modules/normalize.scss/normalize.scss'
import './scss/main.scss'

const PATH = window.location.pathname;

let user = null;

try {
    user = localStorage.getItem('user');
} catch(e) {
    user = null;
}

new Vue({
    el: '#app',
    render: h => (user) ? h(Dashboard) : h(Login)
})

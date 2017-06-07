import axios from 'axios'
import Vue from 'vue'
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'

import './../node_modules/normalize.scss/normalize.scss'
import './scss/main.scss'

const PATH = window.location.pathname;
const JWT = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');

if (JWT) {
    axios.defaults.headers.common['Authorization'] = `JWT ${JWT}`;
}

axios.interceptors.response.use(response => response, function(error) {
    if (error.response.status === 401) {
        sessionStorage.removeItem('jwt');
        localStorage.removeItem('jwt');

        window.location.href = '/admin';
    }
});

new Vue({
    el: '#app',
    render: h => JWT ? h(Dashboard) : h(Login)
})

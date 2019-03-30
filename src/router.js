import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
    { 
        path: '/', 
        name: 'home', 
        component: () => import(/* webpackChunkName: "homepage" */ '@/views/HomePage') 
    },
    { 
        path: '/results', 
        name: 'results', 
        component: () => import(/* webpackChunkName: "resultspage" */ '@/views/ResultPage') 
    }
]

export default new Router({
    mode: 'history',
    routes
})
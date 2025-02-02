import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Login from "@/components/Login/Login.vue";
import Home from "@/components/Home/Home.vue";
import DistributionGroupDetail from "@/components/DistributionGroupDetail/DistributionGroupDetail.vue";

const routes = [
    { path: '/', component: Login },
    { path: '/home', name: 'home', component: Home },
    { path: '/distribution-group/:id', component: DistributionGroupDetail }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
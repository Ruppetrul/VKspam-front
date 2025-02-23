import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import Login from "@/components/Login/Login.vue";
import DistributionGroups from "@/components/DistributionGroups/DistributionGroups.vue";
import DistributionGroupDetail from "@/components/DistributionGroupDetail/DistributionGroupDetail.vue";
import Home from "@/components/Home/Home.vue";
import Logout from "@/components/Logout/Logout.vue";

const routes = [
    {path: '/', component: Login},
    {path: '/home', name: 'home', component: Home},
    {path: '/logout', name: 'logout', component: Logout},
    {path: '/distribution-groups', name: 'distribution-groups', component: DistributionGroups},
    {path: '/distribution-group/:id', name: 'group-detail', component: DistributionGroupDetail}
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
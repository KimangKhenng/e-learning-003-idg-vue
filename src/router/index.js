import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Courses from '@/views/Courses.vue'
import Dashboard from '@/views/Dashboard.vue'
import Home from '@/views/Home.vue'
import Stocks from '@/views/Stocks.vue'
import Teachers from '@/views/Teachers.vue'
import Users from '@/views/Users.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/', redirect: '/dashboard' },
    { path: '/', name: 'Home', component: Home },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        { path: 'dashboard', component: Dashboard },
        { path: 'users', component: Users },
        { path: 'teachers', component: Teachers },
        { path: 'stocks', component: Stocks },
        { path: 'courses', component: Courses },
      ]
    }
  ],
})

export default router

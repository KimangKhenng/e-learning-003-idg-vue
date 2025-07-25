import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Courses from '@/views/Courses.vue'
import Dashboard from '@/views/Dashboard.vue'
import Home from '@/views/Home.vue'
import SignUp from '@/views/SignUp.vue'
import StockDetail from '@/views/Stock/StockDetail.vue'
import Stocks from '@/views/Stock/Stocks.vue'
import Teachers from '@/views/Teachers.vue'
import Users from '@/views/Users.vue'
import { createRouter, createWebHistory } from 'vue-router'

const checkAuth = (to, from) => {
  const token = localStorage.getItem('token')
  console.log(token)
  if (!token) {
    return '/'
  }
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/', redirect: '/dashboard' },
    { path: '/', name: 'Home', component: Home },
    { path: '/sign-up', name: 'SignUp', component: SignUp },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard', component: Dashboard,
          beforeEnter: checkAuth
        },
        { path: 'users', component: Users, beforeEnter: checkAuth },
        { path: 'teachers', component: Teachers, beforeEnter: checkAuth },
        { path: 'stocks', component: Stocks, beforeEnter: checkAuth },
        { path: 'stocks/:id', component: StockDetail, beforeEnter: checkAuth },
        { path: 'courses', component: Courses, beforeEnter: checkAuth },
      ]
    }
  ],
})

// Call auto
// router.beforeEach((to, from) => {
//   console.log(to)
//   if (to.path == '/dashboard' || to.path == '/users' || to.path == '/stocks' || to.path == '/courses' || to.path == '/teachers') {
//     const token = localStorage.getItem('token')
//     console.log(token)
//     if (!token) {
//       return '/'
//     }
//   }
// })

export default router

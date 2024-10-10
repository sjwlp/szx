import { createRouter, createWebHashHistory } from 'vue-router'
import { router1 } from './router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: router1,
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    }
  },
})

export default router

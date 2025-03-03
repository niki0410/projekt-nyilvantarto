import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Home from '../views/Home.vue'
import ProjectList from '../views/ProjectList.vue'
import ProjectForm from '../views/ProjectForm.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/project-list', component: ProjectList },
  { path: '/project-form', component: ProjectForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
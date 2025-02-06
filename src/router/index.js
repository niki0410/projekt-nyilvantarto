import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import ProjectList from '../components/ProjectList.vue'
import ProjectForm from '../components/ProjectForm.vue'

const routes = [
  { path: '/', component: App },
  { path: '/project-list', component: ProjectList },
  { path: '/project-form', component: ProjectForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
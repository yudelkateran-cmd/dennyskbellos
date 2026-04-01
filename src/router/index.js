import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
  path: '/registro',
  name: 'registro',
  component: () => import('../views/RegistroView.vue') // Asegúrate de que la ruta del archivo sea correcta
},
{
  path: '/servicio/:id',
  name: 'DetalleServicio',
  component: () => import('../views/ServiciosView.vue'),
  props: true // Esto permite recibir el ID como una prop en la página
},
{
  path: '/servicios/:id',  // <-- El ":id" es fundamental
  name: 'Servicios',
  component: () => import('../views/ServiciosView.vue')
},
{
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue') // Verifica que el nombre sea este
  },
  {
    path: '/agendar-cita',
    name: 'AgendarCita',
    component: () => import('../views/AgendarCitaView.vue') // La crearemos después
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import { auth } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import('../views/RegistroView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/servicios', 
    name: 'Servicios',
    component: () => import('../views/ServiciosView.vue')
  },
  {
    path: '/servicio/:id',
    name: 'DetalleServicio',
    component: () => import('../views/ServiciosView.vue'),
    props: true 
  },
  {
    path: '/agendar-cita',
    name: 'AgendarCita',
    component: () => import('../views/AgendarCitaView.vue'),
    // Esta metaetiqueta indica que la ruta es privada
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  // Mantenemos la base para GitHub Pages
  history: createWebHistory('/dennyskbellos/'), 
  routes
})

// Función auxiliar para esperar a que Firebase esté listo
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

// Guardián de navegación global
router.beforeEach(async (to, from, next) => {
  const requiereAuth = to.matched.some(record => record.meta.requiresAuth);
  
  // Esperamos a que Firebase nos confirme si hay usuario antes de decidir
  const usuario = await getCurrentUser();

  if (requiereAuth && !usuario) {
    // Si la ruta requiere auth y no hay usuario, mandamos al login
    next('/login'); 
  } else if (to.path === '/login' && usuario) {
    // Si el usuario ya está logueado e intenta ir al login, lo mandamos a agendar
    next('/agendar-cita');
  } else {
    next();
  }
});

export default router
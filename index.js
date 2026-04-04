import { createStore } from 'vuex'
import { serviciosPeluqueria } from '@/servicios.js'

export default createStore({
  state: {
    // 1. Guardamos la lista de servicios aquí
    servicios: serviciosPeluqueria,
    nombreNegocio: 'DennysKbellos',
    contacto: {
      whatsapp: '+56 9 5691 9142',
      instagram: '@dennyskbellos'
    }
  },
  getters: {
    // 2. Un buscador rápido por ID para la página de detalle

    getServicioById: (state) => (/** @type {any} */ id) => {
  return state.servicios.find(s => s.id === parseInt(id))
}
  },
  mutations: {
  
  },
  actions: {
    
  }
})
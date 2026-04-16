import { createStore } from 'vuex'
import { serviciosPeluqueria } from '../servicios.js' 

export default createStore({
  state: {
    servicios: serviciosPeluqueria,
    nombreNegocio: 'DennysKbellos',
    contacto: {
      whatsapp: '+56 9 5691 9142',
      instagram: '@dennys_kbellos'
    },
    // Añadimos el estado del usuario (null significa que no hay sesión)
    user: null 
  },
  getters: {
    getServicioById: (state) => (id) => {
      return state.servicios.find((s) => s.id === parseInt(id))
    },
    // Getter para saber rápidamente si el usuario está autenticado
    isAuthenticated: (state) => !!state.user 
  },
  mutations: {
    // Esta función actualizará el estado del usuario
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    // Acción para ejecutar el cambio de usuario desde cualquier componente
    updateUser({ commit }, user) {
      commit('SET_USER', user)
    }
  }
})
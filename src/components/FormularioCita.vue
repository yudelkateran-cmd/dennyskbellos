<template>
  <div class="booking-container">
    <h2>Agendar Cita en DennysK'bellos</h2>

    <p v-if="usuario" class="user-welcome">Hola, <strong>{{ usuario.nombre }}</strong>. Completa los datos para tu cita.</p>

    <form @submit.prevent="enviarCita">
      <div class="form-group">
        <label>Selecciona el Servicio:</label>
        <select v-model="nuevaCita.servicio" required>
          <option disabled value="">-- Elegir un servicio --</option>
          <option v-for="s in listaServicios" :key="s.id" :value="s.nombre">
            {{ s.nombre }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Tu WhatsApp:</label>
        <input v-model="nuevaCita.phone" type="tel" placeholder="+56 9 XXXX XXXX" required />
      </div>

      <div class="form-group">
        <label>Selecciona la Fecha:</label>
        <div v-if="mensajeDiaLleno" class="aviso-lleno">{{ mensajeDiaLleno }}</div>

        <VDatePicker v-model="fechaSeleccionada" :min-date="new Date()" :attributes="atributosCalendario"
          @dayclick="onDiaSeleccionado" mode="date" expanded transparent borderless />
      </div>

      <div v-if="nuevaCita.fecha && !mensajeDiaLleno" class="horas-container">
        <label>Selecciona una Hora Disponible:</label>
        <div class="horas-grid">
          <button type="button" v-for="h in bloquesHorarios" :key="h"
            :class="['hora-btn', { 'seleccionada': nuevaCita.hora === h }]" :disabled="estaOcupada(nuevaCita.fecha, h)"
            @click="nuevaCita.hora = h">
            {{ h }}
          </button>
        </div>
      </div>

      <button type="submit" class="btn-enviar" :disabled="!nuevaCita.hora || mensajeDiaLleno">
        Reservar Cita {{ nuevaCita.hora }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'; // Importamos el Store
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { serviciosPeluqueria } from '../servicios.js';

const store = useStore();
const usuario = computed(() => store.state.user); // Obtenemos el usuario del Store

const listaServicios = ref(serviciosPeluqueria);
const citasExistentes = ref([]);
const mensajeDiaLleno = ref('');
const fechaSeleccionada = ref(new Date());

const atributosCalendario = computed(() => {
  return citasExistentes.value.map(cita => ({
    dot: 'pink',
    dates: new Date(cita.fecha + 'T12:00:00'),
    popover: { label: 'Día con citas' }
  }));
});

const bloquesHorarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

const nuevaCita = ref({
  phone: '',
  servicio: '',
  fecha: '',
  hora: ''
});

const onDiaSeleccionado = (day) => {
  nuevaCita.value.fecha = day.id;
  validarFechaSeleccionada();
};

const cargarCitas = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "citas"));
    citasExistentes.value = querySnapshot.docs.map(doc => doc.data());
  } catch (e) {
    console.error("Error cargando citas:", e);
  }
};

const estaOcupada = (fecha, hora) => {
  return citasExistentes.value.some(c => c.fecha === fecha && c.hora === hora);
};

const validarFechaSeleccionada = () => {
  nuevaCita.value.hora = '';
  const citasEseDia = citasExistentes.value.filter(c => c.fecha === nuevaCita.value.fecha).length;
  mensajeDiaLleno.value = (citasEseDia >= bloquesHorarios.length) ? '❌ Este día no tiene horas disponibles.' : '';
};

const enviarCita = async () => {
  try {
    // Combinamos los datos del formulario con los datos del usuario logueado
    const citaFinal = {
      ...nuevaCita.value,
      clienteNombre: usuario.value.nombre,
      clienteEmail: usuario.value.email,
      clienteUid: usuario.value.uid,
      fechaCreacion: new Date()
    };

    await addDoc(collection(db, "citas"), citaFinal);
    alert(`¡Gracias ${usuario.value.nombre}! Tu cita ha sido agendada.`);
    
    // Limpiamos el formulario (pero no los datos del usuario)
    nuevaCita.value = { phone: '', servicio: '', fecha: '', hora: '' };
    cargarCitas();
  } catch (error) {
    console.error("Error al guardar la cita:", error);
    alert("Hubo un problema al guardar. Inténtalo de nuevo.");
  }
};

onMounted(cargarCitas);
</script>

<style scoped>
/* Tus estilos base se mantienen. Agregué uno para el saludo */
.user-welcome {
  text-align: center;
  color: #6d4c41;
  margin-bottom: 20px;
  background: #fdf5f7;
  padding: 10px;
  border-radius: 10px;
}
/* ... resto de tus estilos ... */
</style>
<template>
  <div class="booking-container">
    <h2>Agendar Cita en DennysKbellos</h2>

    <form @submit.prevent="enviarCita">
      <div class="form-group">
        <label>¿Qué especialidad buscas?</label>
        <select v-model="categoriaSeleccionada" required @change="limpiarServicios">
          <option value="" disabled>Selecciona una categoría</option>
          <option v-for="s in listaServicios" :key="s.id" :value="s.nombre">
            {{ s.nombre }}
          </option>
        </select>
      </div>

      <div class="form-group" v-if="serviciosDisponibles.length > 0">
        <label>Tratamientos disponibles:</label>
        <div class="sub-servicios-grid">
          <div v-for="item in serviciosDisponibles" :key="item" class="checkbox-item">
            <input type="checkbox" :id="item" :value="item" v-model="nuevaCita.serviciosDetalle" />
            <label :for="item">{{ item }}</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>WhatsApp de contacto:</label>
        <input v-model="nuevaCita.phone" type="tel" placeholder="+569..." required />
      </div>

      <div class="form-group">
        <label>Selecciona la Fecha:</label>
        <div v-if="mensajeDiaLleno" class="aviso-lleno">{{ mensajeDiaLleno }}</div>
        <VDatePicker v-model="fechaSeleccionada" :min-date="new Date()" :attributes="atributosCalendario"
          @dayclick="onDiaSeleccionado" mode="date" expanded transparent borderless />
      </div>

      <div v-if="nuevaCita.fecha && !mensajeDiaLleno" class="form-group">
        <label>Hora disponible:</label>
        <div class="horas-grid">
          <button type="button" v-for="h in bloquesHorarios" :key="h"
            :class="['hora-btn', { 'seleccionada': nuevaCita.hora === h }]" :disabled="estaOcupada(nuevaCita.fecha, h)"
            @click="nuevaCita.hora = h">
            {{ h }}
          </button>
        </div>
      </div>

      <button type="submit" class="btn-enviar"
        :disabled="!nuevaCita.hora || mensajeDiaLleno || nuevaCita.serviciosDetalle.length === 0">
        Confirmar Reserva ✨
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { serviciosPeluqueria } from '../servicios.js';

const listaServicios = ref(serviciosPeluqueria);
const citasExistentes = ref([]);
const mensajeDiaLleno = ref('');
const fechaSeleccionada = ref(new Date());
const categoriaSeleccionada = ref('');

const nuevaCita = ref({
  phone: '',
  servicioPrincipal: '',
  serviciosDetalle: [], // Aquí se guardan los checkboxes elegidos
  fecha: '',
  hora: ''
});

// Extrae los sub-servicios de la data original
const serviciosDisponibles = computed(() => {
  const cat = listaServicios.value.find(s => s.nombre === categoriaSeleccionada.value);
  return cat && cat.subServicios ? cat.subServicios : ['Servicio Estándar'];
});

const limpiarServicios = () => {
  nuevaCita.value.serviciosDetalle = [];
  nuevaCita.value.servicioPrincipal = categoriaSeleccionada.value;
};

// Calendario
const atributosCalendario = computed(() => {
  return citasExistentes.value.map(cita => ({
    dot: 'pink',
    dates: new Date(cita.fecha + 'T12:00:00'),
    popover: { label: 'Ocupado' }
  }));
});

const onDiaSeleccionado = (day) => {
  nuevaCita.value.fecha = day.id;
  validarFechaSeleccionada();
};

const bloquesHorarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

const cargarCitas = async () => {
  try {
    const res = await getDocs(collection(db, "citas"));
    citasExistentes.value = res.docs.map(doc => doc.data());
  } catch (e) { console.error(e); }
};

const estaOcupada = (fecha, hora) => citasExistentes.value.some(c => c.fecha === fecha && c.hora === hora);

const validarFechaSeleccionada = () => {
  nuevaCita.value.hora = '';
  const total = citasExistentes.value.filter(c => c.fecha === nuevaCita.value.fecha).length;
  mensajeDiaLleno.value = total >= bloquesHorarios.length ? '❌ Día completo' : '';
};

const enviarCita = async () => {
  try {
    await addDoc(collection(db, "citas"), nuevaCita.value);
    alert("¡Cita reservada!");
    location.reload(); // Para limpiar todo
  } catch (e) { console.error(e); }
};

onMounted(cargarCitas);
</script>

<style scoped>
/* RECUERDA: Agregué estos estilos para los checkboxes */
.sub-servicios-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: #fff5f8;
  padding: 15px;
  border-radius: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #4e342e;
}

.checkbox-item input {
  width: auto;
  margin: 0;
  cursor: pointer;
}

/* El resto de tus estilos (booking-container, hora-btn, etc) se mantienen igual */
.booking-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 40px;
  border-radius: 25px;
  background: #ffffff;
  border: 1px solid #fce4ec;
  box-shadow: 0 20px 40px rgba(121, 85, 72, 0.08);
  font-family: 'Playfair Display', serif;
}

h2 {
  color: #4e342e;
  font-size: 2.2rem;
  margin-bottom: 30px;
  text-align: center;
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  color: #6d4c41;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

select,
input[type="tel"] {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1.5px solid #eee;
  background-color: #fafafa;
}

.horas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 12px;
}

.hora-btn {
  padding: 12px;
  border: 1.5px solid #ff80ab;
  background: transparent;
  color: #ff80ab;
  border-radius: 10px;
  cursor: pointer;
}

.hora-btn.seleccionada {
  background: #ff80ab;
  color: white;
}

.btn-enviar {
  width: 100%;
  margin-top: 35px;
  background: linear-gradient(45deg, #ff80ab, #f48fb1);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 15px;
  font-weight: bold;
  cursor: pointer;
}
</style>
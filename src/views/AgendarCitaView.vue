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

      <div class="form-group" v-if="categoriaSeleccionada && serviciosDisponibles.length > 0">
        <label>Tratamientos para {{ categoriaSeleccionada }}:</label>
        <div class="sub-servicios-grid">
          <div v-for="item in serviciosDisponibles" :key="item" class="checkbox-item">
            <input type="checkbox" :id="item" :value="item" v-model="nuevaCita.serviciosDetalle" />
            <label :for="item">{{ item }}</label>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label>Fono de contacto:</label>
        <input v-model="nuevaCita.phone" type="tel" placeholder="+569..." required />
      </div>

      <div class="form-group">
        <label>Selecciona la Fecha:</label>
        <div v-if="mensajeDiaLleno" class="aviso-lleno">{{ mensajeDiaLleno }}</div>
        <VDatePicker v-model="fechaSeleccionada" :min-date="new Date()" :attributes="atributosCalendario"
          @dayclick="onDiaSeleccionado" mode="date" expanded transparent borderless />
      </div>

      <div v-if="nuevaCita.fecha && !mensajeDiaLleno" class="form-group">
        <label>Hora para el {{ nuevaCita.fecha }}:</label>
        <div class="horas-grid">
          <button type="button" v-for="h in bloquesHorarios" :key="h"
            :class="['hora-btn', { 'seleccionada': nuevaCita.hora === h }]" :disabled="estaOcupada(nuevaCita.fecha, h)"
            @click="nuevaCita.hora = h">
            {{ h }}
          </button>
        </div>
      </div>

      <div class="footer-form">
        <button type="submit" class="btn-enviar" v-if="!mostrarBotonPago" :disabled="!formularioListo">
          Confirmar Reserva ✨
        </button>

        <div v-if="mostrarBotonPago" class="pago-container" id="seccion-pago">
          <p class="pago-instruccion">¡Cita reservada! Para asegurar tu cupo, realiza el pago ahora:</p>
          <button type="button" @click="irAlPago" class="btn-pago">
            Pagar con Mercado Pago 💳
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { serviciosPeluqueria } from '../servicios.js';
import { useStore } from 'vuex';

const store = useStore();
const usuario = computed(() => store.state.user);

// ESTADOS
const mostrarBotonPago = ref(false);
const mostrarPopupPago = ref(false);

const listaServicios = ref(serviciosPeluqueria);
const citasExistentes = ref([]);
const mensajeDiaLleno = ref('');
const fechaSeleccionada = ref(new Date());
const categoriaSeleccionada = ref('');

const nuevaCita = ref({
  phone: '',
  servicioPrincipal: '',
  serviciosDetalle: [],
  fecha: '',
  hora: ''
});

// DATOS TRANSFERENCIA
const datosTransferencia = {
  nombre: 'Dennys Mariangeles Castillo Duran',
  rut: '26.618.593-6',
  tipoCuenta: 'Cuenta Corriente',
  numeroCuenta: '0 000 27 75007 9',
  banco: 'Banco Santander',
  correo: 'DENNYSCASTILLO49@GMAIL.COM'
};

// BANCOS
const bancosChile = [
  { nombre: 'Santander', url: 'https://www.santander.cl' },
  { nombre: 'BancoEstado', url: 'https://www.bancoestado.cl' },
  { nombre: 'Banco de Chile', url: 'https://www.bancochile.cl' },
  { nombre: 'BCI', url: 'https://www.bci.cl' },
  { nombre: 'Itaú', url: 'https://www.itau.cl' },
  { nombre: 'Falabella', url: 'https://www.bancofalabella.cl' }
];

// VALIDACIÓN
const formularioListo = computed(() => {
  return (
    categoriaSeleccionada.value !== '' &&
    nuevaCita.value.serviciosDetalle.length > 0 &&
    nuevaCita.value.phone.trim().length >= 12 &&
    nuevaCita.value.fecha !== '' &&
    nuevaCita.value.hora !== '' &&
    mensajeDiaLleno.value === ''
  );
});

// GUARDAR CITA
const enviarCita = async () => {
  try {
    await addDoc(collection(db, "citas"), {
      ...nuevaCita.value,
      timestamp: new Date()
    });
    mostrarBotonPago.value = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (e) {
    console.error(e);
    alert("Error al guardar la cita.");
  }
};

// POPUP
const abrirPopupPago = () => {
  mostrarPopupPago.value = true;
};

const cerrarPopupPago = () => {
  mostrarPopupPago.value = false;
};

// SERVICIOS
const serviciosDisponibles = computed(() => {
  const cat = listaServicios.value.find(s => s.nombre === categoriaSeleccionada.value);
  return cat ? cat.subservicios : [];
});

const limpiarServicios = () => {
  nuevaCita.value.serviciosDetalle = [];
  nuevaCita.value.servicioPrincipal = categoriaSeleccionada.value;
  nuevaCita.value.hora = '';
};

// CALENDARIO
const atributosCalendario = computed(() => {
  return citasExistentes.value.map(cita => ({
    dot: 'pink',
    dates: new Date(cita.fecha + 'T12:00:00')
  }));
});

const onDiaSeleccionado = (day) => {
  nuevaCita.value.fecha = day.id;
  validarFechaSeleccionada();
};

const bloquesHorarios = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00', '18:00'];

const cargarCitas = async () => {
  const res = await getDocs(collection(db, "citas"));
  citasExistentes.value = res.docs.map(doc => doc.data());
};

const estaOcupada = (fecha, hora) => {
  return citasExistentes.value.some(c => c.fecha === fecha && c.hora === hora);
};

const validarFechaSeleccionada = () => {
  nuevaCita.value.hora = '';
  const total = citasExistentes.value.filter(c => c.fecha === nuevaCita.value.fecha).length;
  mensajeDiaLleno.value = total >= bloquesHorarios.length ? '❌ Día completo' : '';
};

onMounted(cargarCitas);
</script>

<style scoped>
/* Optimizaciones de diseño */
.booking-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 30px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  height: auto;
}

.pago-container {
  margin-top: 30px;
  padding: 20px;
  background-color: #fffde7;
  border: 2px dashed #ffd54f;
  border-radius: 15px;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.btn-pago {
  width: 100%;
  background-color: #009ee3;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
}

.btn-enviar {
  width: 100%;
  padding: 15px;
  background: linear-gradient(to right, #ff80ab, #f48fb1);
  border: none;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 35px;
}

.btn-enviar:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.sub-servicios-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  background: #fff5f8;
  padding: 15px;
  border-radius: 12px;
}

.horas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
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
</style>
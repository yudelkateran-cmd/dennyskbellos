<template>
  <div class="agenda-container">
    <div class="agenda-card">
      <header class="agenda-header">
        <h1>Reserva tu Cita</h1>
        <p>Selecciona el servicio y el horario que prefieras</p>
      </header>

      <form @submit.prevent="confirmarCita" class="agenda-form">
        <!-- Selección de Servicio -->
        <div class="form-group">
          <label>¿Qué servicio deseas?</label>
          <select v-model="cita.servicio" required>
            <option value="" disabled>Selecciona un servicio</option>
            <option v-for="s in servicios" :key="s.id" :value="s.nombre">
              {{ s.nombre }}
            </option>
          </select>
        </div>

        <!-- Selección de Fecha -->
        <div class="form-group">
          <label>Fecha</label>
          <input type="date" v-model="cita.fecha" :min="fechaMinima" required>
        </div>

        <!-- Selección de Hora -->
        <div class="form-group">
          <label>Hora disponible</label>
          <select v-model="cita.hora" required>
            <option value="" disabled>Selecciona una hora</option>
            <option v-for="h in horarios" :key="h" :value="h">{{ h }}</option>
          </select>
        </div>

        <button type="submit" class="btn-confirmar">Confirmar Reserva ✨</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { serviciosPeluqueria } from '@/servicios.js';

const servicios = serviciosPeluqueria;

// Datos de la cita
const cita = reactive({
  servicio: '',
  fecha: '',
  hora: ''
});

// Horarios sugeridos 
const horarios = ['10:00', '11:30', '13:00', '15:30', '17:00', '18:30'];

// Evitar que elijan fechas pasadas
const fechaMinima = computed(() => {
  const hoy = new Date();
  return hoy.toISOString().split('T')[0];
});

const confirmarCita = () => {
  alert(`¡Perfecto! Tu cita para ${cita.servicio} el día ${cita.fecha} a las ${cita.hora} ha sido reservada. ¡Te esperamos en DennysKbellos!`);
};
</script>

<style scoped>
.agenda-container {
  min-height: 90vh;
  padding: 120px 20px 50px;
  background-color: #fffafb;
  display: flex;
  justify-content: center;
}

.agenda-card {
  background: white;
  width: 100%;
  max-width: 500px;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(78, 52, 46, 0.05);
  border: 1px solid #fce4ec;
}

.agenda-header {
  text-align: center;
  margin-bottom: 30px;
}

h1 {
  font-family: 'Playfair Display', serif;
  color: #4e342e;
  font-size: 2rem;
}

p {
  color: #8d6e63;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

label {
  display: block;
  font-weight: 600;
  color: #4e342e;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

select, input {
  width: 100%;
  padding: 12px;
  border: 1px solid #fce4ec;
  border-radius: 10px;
  outline: none;
  font-family: inherit;
}

select:focus, input:focus {
  border-color: #ff80ab;
}

.btn-confirmar {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, #ff80ab, #f48fb1);
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 128, 171, 0.3);
  transition: transform 0.2s;
}

.btn-confirmar:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 128, 171, 0.4);
}
</style>
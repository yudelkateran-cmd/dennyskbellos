<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1 class="brand-title">DennysKbellos</h1>
        <p class="hero-subtitle">El brillo que tu cabello merece.</p>
        <button class="btn-glitter-main">Reservar Cita</button>
      </div>
    </section>

    <section class="servicios-section">
      <h2 class="section-title">Nuestros Servicios</h2>
      <div class="grid-servicios">
        <router-link v-for="s in servicios" :key="s.id" :to="{ name: 'DetalleServicio', params: { id: s.id } }"
          class="card-servicio">
          <div class="card-icon">✨</div>
          <h3>{{ s.nombre }}</h3>
          <p class="servicio-detalle">{{ s.detalle }}</p>
          <span class="leer-mas">Ver trabajos y galería →</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { serviciosPeluqueria } from '@/servicios.js';
const servicios = serviciosPeluqueria;
</script>

<style scoped>
/* --- SECCIÓN HERO --- */
.hero {
  /* Fondo café premium con degradado para dar profundidad */
  background: linear-gradient(rgba(78, 52, 46, 0.8), rgba(78, 52, 46, 0.9)),
    url('https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 120px 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.brand-title {
  font-family: 'Playfair Display', serif;
  /* Fuente elegante */
  font-size: 4rem;
  margin-bottom: 10px;
  letter-spacing: 3px;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-style: italic;
  margin-bottom: 30px;
  color: #fce4ec;
  /* Rosado pálido */
}


.leer-mas {
  display: block;
  margin-top: 20px;
  font-size: 0.85rem;
  font-weight: bold;
  color: #ff80ab; /* Tu rosado característico */
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Botón con efecto Glitter para el Hero */
.btn-glitter-main {
  background: linear-gradient(45deg, #ff80ab, #f48fb1, #fce4ec);
  background-size: 200% 200%;
  border: none;
  padding: 15px 40px;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: 0.5s;
  box-shadow: 0 5px 20px rgba(255, 128, 171, 0.4);
}

.btn-glitter-main:hover {
  background-position: right center;
  transform: translateY(-3px);
}

/* --- SECCIÓN SERVICIOS --- */
.servicios-section {
  padding: 80px 5%;
  background-color: #fdfaf9;
}

.section-title {
  text-align: center;
  color: #4e342e;
  font-size: 2.5rem;
  margin-bottom: 50px;
}

.grid-servicios {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.card-servicio {
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  border: 1px solid #fce4ec;
  transition: all 0.4s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  text-decoration: none;
  display: block; 


}

.card-servicio:hover {
  transform: translateY(-10px);
  border-color: #ff80ab;
  box-shadow: 0 10px 30px rgba(255, 128, 171, 0.15);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 15px;
}

h3 {
  color: #4e342e;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.servicio-detalle {
  color: #795548;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Responsividad para móviles */
@media (max-width: 768px) {
  .brand-title {
    font-size: 2.5rem;
  }

  .grid-servicios {
    padding: 0 20px;
  }
}
</style>
<template>
  <div class="detalle-page" v-if="servicio">
    <div class="header-servicio">
      <h1>{{ servicio.nombre }}</h1>
      <p class="descripcion">{{ servicio.detalle }}</p>
    </div>

    <section class="galeria-seccion">
      <h2 class="titulo-galeria">Nuestro Trabajo Real</h2>
      
      <div v-if="servicio.fotos.length === 0" class="no-fotos">
        <p>Próximamente fotos de nuestros trabajos en La Serena...</p>
      </div>

      <div v-else class="galeria-grid">
        <div v-for="(img, index) in servicio.fotos" :key="index" class="foto-card">
          <img :src="img" alt="Trabajo de DennysKbellos" />
        </div>
      </div>

      <router-link to="/" class="btn-volver">← Volver al Inicio</router-link>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { serviciosPeluqueria } from '@/servicios.js';

const route = useRoute();

const servicio = computed(() => {

  const servicioId = String(route.params.id); 
  
  return serviciosPeluqueria.find(s => s.id === parseInt(servicioId));
});
</script>

<style scoped>
.detalle-page { padding: 120px 5% 60px; text-align: center; }
h1 { font-family: 'Playfair Display', serif; color: #4e342e; font-size: 3rem; }
.descripcion { color: #6d4c41; font-size: 1.2rem; margin-bottom: 40px; }

.galeria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  max-width: 1200px;
  margin: 40px auto;
}

.foto-card img {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.foto-card img:hover { transform: scale(1.03); }

.no-fotos {
  padding: 50px;
  border: 2px dashed #fce4ec;
  border-radius: 20px;
  color: #ad8a81;
}

.btn-volver {
  display: inline-block;
  margin-top: 50px;
  color: #4e342e;
  text-decoration: none;
  font-weight: bold;
}
</style>
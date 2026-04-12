<template>
  <div class="galeria-grid">
    <div v-for="(foto, index) in imagenes" :key="index"
      :class="['foto-item', index % 2 === 0 ? 'girar-der' : 'girar-izq']">
      <div class="marco-polaroid">
        <div class="contenedor-imagen">
          <img :src="foto" alt="Trabajo Real DennysKbellos" />
        </div>
        <div class="descripcion-vintage">
          <p>Resultado Real ✨</p>
          <span>DennysKbellos</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['imagenes']);
</script>

<style scoped>
/* Importamos una fuente manuscrita para el toque vintage */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap');

.galeria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px; /* Más espacio para que no choquen al rotar */
  padding: 40px 20px;
  background-color: #fdfaf9;
}

.foto-item {
  transition: transform 0.4s ease;
  display: flex;
  justify-content: center;
}

.marco-polaroid {
  background: white;
  padding: 12px 12px 35px 12px; /* Espacio extra abajo para el texto */
  border-radius: 2px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #f0f0f0;
  width: 100%;
  max-width: 280px;
}

.contenedor-imagen {
  overflow: hidden;
  aspect-ratio: 1 / 1; /* Foto cuadrada estilo 600 */
  background: #eee;
}

.contenedor-imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Rotación sutil */
.girar-der {
  transform: rotate(3deg);
}

.girar-izq {
  transform: rotate(-3deg);
}

/* Efecto al pasar el mouse */
.foto-item:hover {
  transform: rotate(0deg) scale(1.1);
  z-index: 10;
}

.descripcion-vintage {
  padding-top: 15px;
  text-align: center;
}

.descripcion-vintage p {
  font-family: 'Dancing Script', cursive; /* Fuente manuscrita */
  color: #4e342e;
  font-size: 1.4rem;
  margin: 0;
  line-height: 1;
}

.descripcion-vintage span {
  display: block;
  font-size: 0.65rem;
  color: #ff80ab;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 5px;
}
</style>
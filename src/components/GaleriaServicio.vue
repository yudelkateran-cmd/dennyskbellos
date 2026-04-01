<template>
  <div class="galeria-grid">
    <div v-for="(foto, index) in imagenes" :key="index" class="foto-item">
      <img :src="foto" alt="Trabajo de DennysKbellos" />
    </div>
  </div>
</template>

<script setup>
defineProps(['imagenes']);
</script>

<style scoped>
.galeria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}
.foto-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s;
}
.foto-item img:hover {
  transform: scale(1.05);
}
</style>
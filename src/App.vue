<template>
  <div id="app">
    <HeaderView />

    <main class="main-content">
      <router-view />
    </main>

    <FooterView />
  </div>
</template>

<script setup>
// Importamos tus nuevos archivos usando el alias "@" que configuramos
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';
</script>

<style>
/* Estilos globales para DennysKbellos */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ocupa el 100% de la altura de la pantalla */
}

.main-content {
  flex: 1; /* Esto empuja al Footer hacia abajo si la página tiene poco contenido */
  background-color: #fdfaf9; /* Ese color crema suave que armoniza con el café */
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
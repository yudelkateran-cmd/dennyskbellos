<template>
  <div id="app">
    <HeaderView :usuario="usuarioActivo" />

    <main class="main-content">
      <router-view />
    </main>

    <FooterView />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from './firebase'; // Asegúrate de tener auth exportado en tu firebase.js
import { onAuthStateChanged } from 'firebase/auth';
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';

const usuarioActivo = ref(null);

onMounted(() => {
  // Este es el "vigilante" real de Firebase
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Si el usuario entró con Google, traemos su nombre real
      usuarioActivo.value = {
        nombre: user.displayName || 'Usuario',
        foto: user.photoURL // ¡Incluso podemos traer su foto de Google!
      };
    } else {
      usuarioActivo.value = null;
    }
  });
});
</script>
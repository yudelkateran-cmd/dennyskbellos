<template>
  <header class="main-header">
    <div class="header-container">
      <div class="brand">
        <router-link to="/" class="logo-text">DennysK'bellos</router-link>
      </div>

      <div class="logo-central">
        <router-link to="/">
          <img src="@/assets/logo.jpeg" alt="DennysKbellos Logo" class="logo-img">
        </router-link>
      </div>

      <nav class="nav-menu">
        <router-link to="/" class="nav-link">Inicio</router-link>
        <router-link to="/servicios" class="nav-link">Servicios</router-link>

        <div v-if="!usuarioActivo" class="auth-buttons">
          <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
          <router-link to="/registro" class="btn-glitter">Registrarse</router-link>
        </div>

        <div v-else class="user-profile">
          <div class="user-info">
            <span class="greeting">Hola,</span>
            <span class="name">{{ usuarioActivo.displayName?.split(' ')[0] }}</span>
            <button @click="cerrarSesion" class="btn-logout">Cerrar sesión</button>
          </div>
          <div class="avatar">
            {{ usuarioActivo.displayName?.charAt(0).toUpperCase() }}
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase';
import { useRouter } from 'vue-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const usuarioActivo = ref(null);
const router = useRouter();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    usuarioActivo.value = user;
  });
});

// IMPORTANTE: Debes definir la función que el botón llama al hacer @click
const cerrarSesion = async () => {
  try {
    await signOut(auth);
    router.push('/'); // Redirige a inicio tras salir
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
</script>

<style scoped>
.main-header {
  background: white;
  border-bottom: 1px solid #fce4ec;
  padding: 10px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.btn-logout {
  background: none;
  border: none;
  color: #ff80ab;
  font-size: 0.7rem;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  text-align: right;
  font-weight: bold;
}

.btn-logout:hover {
  color: #4e342e;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

/* Lado Izquierdo */
.logo-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #4e342e;
  text-decoration: none;
  font-weight: bold;
}

/* Centro - El logo controlado */
.logo-central .logo-img {
  height: 80px;
  /* Tamaño controlado para que no rompa nada */
  width: auto;
  display: block;
}

/* Lado Derecho */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-link {
  text-decoration: none;
  color: #4e342e;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 12px;
  transition: 0.3s;
}

.nav-link:hover {
  color: #ff80ab;
}

.btn-glitter {
  background: linear-gradient(45deg, #ff80ab, #f48fb1);
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  box-shadow: 0 4px 10px rgba(255, 128, 171, 0.3);
}

/* Perfil Usuario */
.user-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff5f8;
  padding: 5px 15px;
  border-radius: 50px;
  border: 1px solid #fce4ec;
}

.user-info {
  display: flex;
  flex-direction: column;
  line-height: 1;
  text-align: right;
}

.greeting {
  font-size: 0.7rem;
  color: #ad8a81;
}

.name {
  font-size: 0.85rem;
  font-weight: bold;
  color: #4e342e;
}

.avatar {
  width: 32px;
  height: 32px;
  background: #ff80ab;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

/* Responsivo */
@media (max-width: 768px) {
  .logo-text {
    display: none;
  }

  .logo-central .logo-img {
    height: 60px;
  }
}
</style>
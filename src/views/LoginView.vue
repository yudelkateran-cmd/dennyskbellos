<template>
  <div class="login-container">
    <div class="login-card">
      <div class="logo-space">
        <img src="@/assets/dennys3.png" alt="Logo" class="mini-logo">
      </div>
      <h2>¡Qué bueno verte de nuevo!</h2>
      <p class="subtitle">Ingresa para agendar tu próxima transformación</p>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <label>Correo Electrónico</label>
          <input type="email" v-model="form.email" placeholder="tu@correo.com" required>
        </div>

        <div class="input-group">
          <label>Contraseña</label>
          <input type="password" v-model="form.password" placeholder="********" required>
        </div>

        <button type="submit" class="btn-glitter-login">Entrar</button>
      </form>

      <p class="footer-text">
        ¿Aún no tienes cuenta? <router-link to="/registro">Regístrate aquí</router-link>
      </p>
    </div>
  </div>
</template>


<script setup>
  import {reactive} from 'vue';
  import {useRouter} from 'vue-router';
  import {useStore} from 'vuex'; // 1. Importamos el Store
  import {auth} from '@/firebase.js';
  import {signInWithEmailAndPassword} from "firebase/auth";

  const router = useRouter();
  const store = useStore(); // 2. Inicializamos el Store

  const form = reactive({
    email: '',
  password: ''
});

const handleLogin = async () => {
  try {
    // Intentar iniciar sesión con Firebase
    const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
  const user = userCredential.user;

  // 3. Actualizamos el Store inmediatamente después del login exitoso
  store.dispatch('updateUser', {
    uid: user.uid,
  email: user.email,
  nombre: user.displayName || 'Usuario', // Firebase trae el nombre si existe
  foto: user.photoURL
    });

  console.log("Sesión iniciada con éxito");
  router.push('/agendar-cita'); 
  } catch (error) {
    console.error("Error al entrar:", error.code);

  // Un toque de amabilidad en los mensajes de error
  if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
    alert("Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    } else {
    alert("Hubo un problema al intentar entrar. Revisa tu conexión.");
    }
  }
};

</script>

<style scoped>
.login-container {
  min-height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffafb;
}

.login-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(78, 52, 46, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.mini-logo {
  height: 60px;
  margin-bottom: 20px;
}

h2 {
  font-family: 'Playfair Display', serif;
  color: #4e342e;
  margin-bottom: 10px;
}

.subtitle {
  color: #8d6e63;
  font-size: 0.9rem;
  margin-bottom: 30px;
}

.input-group {
  text-align: left;
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 0.85rem;
  color: #4e342e;
  margin-bottom: 5px;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #fce4ec;
  border-radius: 10px;
  outline: none;
}

input:focus {
  border-color: #ff80ab;
}

.btn-glitter-login {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 50px;
  background: linear-gradient(45deg, #4e342e, #6d4c41);
  /* Café elegante para variar del rosado */
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s;
}

.btn-glitter-login:hover {
  transform: scale(1.02);
  background: linear-gradient(45deg, #ff80ab, #f48fb1);
  /* Cambia a rosado al pasar el mouse */
}

.footer-text {
  margin-top: 25px;
  font-size: 0.85rem;
  color: #6d4c41;
}

.footer-text a {
  color: #ff80ab;
  text-decoration: none;
  font-weight: bold;
}
</style>

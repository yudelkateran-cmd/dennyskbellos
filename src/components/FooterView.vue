<template>
  <footer class="main-footer">
    <div class="footer-content">
      
      <div class="footer-section">
        <h4>DennysKbellos</h4>
        <p>Experta en Colorimetría y Estilo.</p>

        <div class="social-buttons-container">
          <a href="https://www.instagram.com/dennys_kbellos" target="_blank" class="btn-instagram">
            <i class="bi bi-instagram"></i> @dennys_kbellos
          </a>

          <a href="https://wa.me/56956919142" target="_blank" class="btn-whatsapp">
            <div class="icon-container-mini"><i class="bi bi-whatsapp"></i></div>
            <div class="text-container">
              <span class="label">WhatsApp</span>
              <span class="number">+569 5691 9142</span>
            </div>
          </a>
        </div>
      </div>

      <div class="footer-section">
        <h4>Contacto</h4>
        <p class="address">
          <span>📍</span>
          <span class="address-text">JJ. La Torre 461, Puertas del Mar, La Serena, Chile</span>
        </p>
        
        <div class="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3459.123!2d-71.255!3d-29.905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU0JzE4LjAiUyA3McKwMTUnMTguMCJX!5e0!3m2!1ses!2scl!4v1620000000000!5m2!1ses!2scl"
            width="100%" height="150" style="border:0;" allowfullscreen loading="lazy">
          </iframe>
        </div>
      </div>

    </div>

    <div class="footer-bottom">
      © 2026 Diseñado por Inv. JRT SPA - DennysK'bellos
    </div>
  </footer>
</template>

<style scoped>
/* 1. ESTRUCTURA PRINCIPAL DEL FOOTER */
.main-footer {
  background-color: #4e342e;
  color: #fce4ec;
  padding: 50px 8% 30px;
  margin-top: 50px;
  font-family: 'Segoe UI', Tahoma, sans-serif;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  flex: 1 1 300px;
  max-width: 450px;
}

.footer-section-contact {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: flex-start;
  /* O center, si quieres centrar todo el footer */
}

.social-buttons-container {
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin-top: 15px;
  flex-wrap: wrap; /* Para que en celular no se rompa */
}


h4 {
  color: white;
  margin-bottom: 20px;
  font-size: 1.4rem;
}

/* 2. BOTÓN INSTAGRAM (Limpiado y Unificado) */
.btn-instagram {
  box-shadow: 0 4px 10px rgba(204, 35, 102, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  border: none;
  height: 48px;
  /* Misma altura que el de WhatsApp */
  box-sizing: border-box;

}

.btn-instagram:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(204, 35, 102, 0.6);
  filter: brightness(1.1);
}

.btn-instagram:active {
  transform: translateY(1px);
}

.btn-instagram i,
.btn-instagram img {
  font-size: 1.2rem;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
}

/* 3. BOTÓN WHATSAPP */
.btn-whatsapp {
  display: inline-flex; /* IMPORTANTE para alinear icono y texto */
  align-items: center;
  background-color: #25d366; /* El verde de WhatsApp */
  color: white;
  text-decoration: none;
  padding: 8px 15px;
  border-radius: 50px;
  height: 48px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(37, 211, 102, 0.2);
}

.btn-whatsapp:hover {
  transform: scale(1.03);
  background-color: #20ba5a;
  box-shadow: 0 6px 16px rgba(37, 211, 102, 0.5);
}

.btn-instagram, .btn-whatsapp {
  flex: 1; /* Esto hace que ambos midan lo mismo */
  min-width: 180px; /* Tamaño mínimo para que no se vean diminutos */
  height: 42px; /* Un poco más delgados se ven más finos */
  padding: 0 15px;
  font-size: 0.9rem; /* Texto un pelo más pequeño para elegancia */
  border-radius: 12px; /* Menos redondeado (no tan cápsula) se ve más moderno */
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.icon-container {
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  padding-right: 12px;
}

.icon-container-mini {
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  padding-right: 10px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.text-container {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.9;
}

.number {
  font-size: 1.1rem;
  font-weight: bold;
}

/* 4. OTROS ELEMENTOS SOCIALES Y MAPA */
.social-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fce4ec;
  text-decoration: none;
  font-size: 1.1rem;
  margin-top: 15px;
  padding: 10px 15px;
  border: 1px solid rgba(252, 228, 236, 0.2);
  border-radius: 8px;
  transition: all 0.3s ease;
  width: fit-content;
}

.social-link:hover {
  background-color: rgba(252, 228, 236, 0.1);
  color: #ffffff;
  transform: translateX(5px);
}

.map-container {
  margin-top: 20px;
  border-radius: 20px;
  /* Bordes más suaves, más modernos */
  overflow: hidden;
  border: 3px solid rgba(252, 228, 236, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.map-container:hover {
  transform: scale(1.02);
  /* Un toque de interactividad */
}

.address {
  display: flex;
  gap: 10px;
  line-height: 1.4;
}

.address i {
  color: #ff80ab;
  /* Usar el color rosa de tu marca para los iconos */
  font-size: 1.2rem;
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid rgba(252, 228, 236, 0.2);
  padding-top: 30px;
  font-size: 0.85rem;
  opacity: 0.8;
}
@media (max-width: 600px) {
  .social-buttons-container {
    flex-direction: column;
    align-items: flex-start;
  }
  .btn-instagram, .btn-whatsapp {
    width: 100%; /* En móvil, que ocupen todo el ancho */
    max-width: 300px;
  }
}
</style>
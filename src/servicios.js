// 1. Definimos la estructura (Interface) para que TypeScript no se queje
/**
 * @typedef {Object} Servicio
 * @property {number} id
 * @property {string} nombre
 * @property {string[]} subservicios
 * @property {any} fotos
 * @property {string} [detalle]  
 */

// @ts-ignore
const contextoImagenes = import.meta.glob('./assets/trabajos/*.{png,jpg,jpeg,svg}', { eager: true });

const todasLasFotos = Object.values(contextoImagenes).map((mod) => mod.default);

/** @type {Servicio[]} */ // <-- Aquí le decimos que este array contiene "Servicios"
export const serviciosPeluqueria = [
 {
  id: 1,
  nombre: 'Colorimetría',
  subservicios: ['Corrección de Color', 'Cobertura de Canas', 'Balayage', 'Baby Lights'],
  fotos: todasLasFotos.filter((foto) => {
    // Es buena práctica definir esto fuera si son muchas fotos, 
    // pero aquí funciona bien.
    const palabrasClave = ['balage', 'balayage', 'canas', 'baby', 'color', 'mechas'];
    const nombreArchivo = foto.toLowerCase();
    
    return palabrasClave.some(palabra => nombreArchivo.includes(palabra));
  }),
  detalle: 'Expertos en cambios de look y cuidado capilar.'
},
{
    id: 2,
    nombre: 'Tratamiento Capilar',
    subservicios: ['Alisado', 'Botox', 'Hidratación', 'Cabellos Curlys', 'Nutrición'],
    fotos: todasLasFotos.filter((/** @type {string} */ foto) => {
      // 1. Agregamos palabras clave basadas en tus subservicios
      const palabrasClave = ['botox', 'alisado', 'hidratacion', 'curly', 'nutricion', 'tratamiento'];
      
      // 2. Buscamos coincidencias ignorando mayúsculas/minúsculas
      return palabrasClave.some(palabra => foto.toLowerCase().includes(palabra));
    }),
    detalle: 'Recupera la vitalidad de tu cabello con nuestros tratamientos.'
  },
{
    id: 3,
    nombre: 'Cortes de Cabello',
    subservicios: ['Corte Dama', 'Corte Varón', 'Corte Niños', 'Cambio de Look'],
    fotos: todasLasFotos.filter((/** @type {string} */ foto) => {
      // 1. Palabras clave que cubren todos tus tipos de corte
      const palabrasClave = ['corte', 'dama', 'varon', 'nino', 'look', 'barba', 'fade', 'tijera'];
      
      // 2. Filtramos ignorando mayúsculas y minúsculas
      return palabrasClave.some(palabra => foto.toLowerCase().includes(palabra));
    }),
    detalle: 'Cortes modernos y clásicos para toda la familia.'
  }
];
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

/**
 * Obtiene los metadatos SEO para una ruta específica.
 * @param {string} ruta - La ruta de la página (ej: '/nosotros', '/producto/123')
 * @returns {Promise<Object>} - Los datos SEO o un objeto por defecto.
 */
export const getSeoByRuta = async (ruta) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/seo?ruta=${encodeURIComponent(ruta)}`);
    return res.data;
  } catch (error) {
    console.warn('Error al obtener SEO, usando valores por defecto:', error);
    // Devolvemos un objeto por defecto para que no falle la UI
    return {
      meta_titulo: 'CERTIMET - Precisión que certifica, Ingeniería que transforma',
      meta_descripcion: 'Soluciones metrológicas y automatización inteligente para optimizar sus procesos.',
      indexar: true,
      seguir_enlaces: true,
      og_titulo: 'CERTIMET',
      og_descripcion: 'Soluciones metrológicas y automatización inteligente',
      og_imagen_url: null,
      twitter_card_tipo: 'summary_large_image',
      schema_json: null,
      url_canonica: null,
    };
  }
};
// URL de la API desde variables de entorno
// En desarrollo: http://localhost:3000/api/v1
// In production: https://portablogio-api.onrender.com/api/v1
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

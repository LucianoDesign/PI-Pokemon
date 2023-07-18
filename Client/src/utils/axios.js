import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/* Crea una instancia de axios  */
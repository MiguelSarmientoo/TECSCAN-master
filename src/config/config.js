// config.js
import dotenv from 'dotenv';
dotenv.config();

const config = {
  API_URL: process.env.API_URL, // Cargar la variable de entorno
  GOOGLE_SPEECH_TO_TEXT_API_KEY: process.env.GOOGLE_SPEECH_TO_TEXT_API_KEY, // Ya la tienes configurada
};

export default config;

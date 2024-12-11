import { Audio } from 'expo-av'; // Importar Audio de expo-av
import config from '../../../config/config'; // Asegúrate de importar tu configuración correspondiente

export const transcribeSpeech = async (audioRecordingRef) => {
  const uri = audioRecordingRef.current.getURI(); // Obtener la URI del audio grabado

  // Lógica para enviar el audio a un servicio de transcripción
  const response = await fetch(`${config.API_URL}/speech/transcribe`, { // Utiliza la URL de tu API
    method: 'POST',
    body: JSON.stringify({ audioUri: uri }), // Envía la URI del audio grabado
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Error en la transcripción del audio'); // Lanza un error si la respuesta no es OK
  }

  const data = await response.json(); // Obtiene la respuesta en formato JSON
  return data.transcription; // Ajusta esto según la estructura de tu respuesta de transcripción
};

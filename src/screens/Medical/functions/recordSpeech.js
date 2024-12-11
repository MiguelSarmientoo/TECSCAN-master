import { Audio } from 'expo-av'; // Importar Audio de expo-av

export const recordSpeech = async (audioRecordingRef, setIsRecording, webAudioPermissions) => {
    if (!webAudioPermissions) {
      throw new Error("Permissions not granted for audio recording.");
    }
  
    // Configuración de la grabación
    const recordingOptions = {
      isMeteringEnabled: true,
      // Puedes agregar otras configuraciones como formato y calidad aquí
    };
  
    // Crear una nueva grabación
    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(recordingOptions); // Prepara la grabación
    audioRecordingRef.current = recording;
  
    // Comenzar la grabación
    await audioRecordingRef.current.startAsync();
    setIsRecording(true);
  };
  
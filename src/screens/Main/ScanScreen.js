import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import config from '../../config/config';

export default function ScanScreen() {
  const [scannedData, setScannedData] = useState(null);
  const navigation = useNavigation();

  // Obtener permisos de la cámara
  const { hasPermission, requestPermission } = useCameraPermission();

  // Usar la cámara trasera
  const device = useCameraDevice('back'); // Configurado a la cámara trasera
  if (!device) return <Text>Cargando cámara...</Text>;

  useEffect(() => {
    (async () => {
      if (hasPermission === false) {
        await requestPermission();
      }
    })();
  }, [hasPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'], // Tipos de códigos a escanear
    onCodeScanned: async (codes) => {
      if (!codes || !codes[0]?.value || isNaN(codes[0]?.value)) {
        showAlert('Error', 'El código escaneado no es válido.');
        return;
      }

      const code = codes[0].value;
      if (scannedData === code) return; // Evita procesar el mismo código repetidamente

      setScannedData(code);

      try {
        const response = await axios.get(`${config.API_URL}/citas/${code}`);
        if (response.data) {
          const pacienteResponse = await axios.get(`${config.API_URL}/pacientes/${response.data.id_paciente}`);
          if (pacienteResponse.data) {
            showPreview({
              id: response.data.id,
              fecha: response.data.fecha,
              hora: response.data.hora,
              nombre: pacienteResponse.data.nombre,
              dni: pacienteResponse.data.dni,
              code, // Pasamos el código para la navegación
              paciente: pacienteResponse.data,
            });
          } else {
            showAlert('Error', 'No se encontraron datos del paciente.');
          }
        } else {
          showAlert('Error', 'No se encontraron datos de la cita.');
        }
      } catch (error) {
        showAlert('Error', 'No se pudo obtener la información de la cita.');
      }
    },
  });

  const showPreview = ({ id, fecha, hora, nombre, dni, code, paciente }) => {
    Alert.alert(
      'Previsualización de Datos',
      `ID: ${id}\nFecha: ${new Date(fecha).toLocaleDateString()}\nHora: ${hora}\nNombre: ${nombre}\nDNI: ${dni}`,
      [
        {
          text: 'Cancelar',
          onPress: () => {
            setScannedData(null); // Permitir escanear nuevamente
          },
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => {
            navigation.navigate('PacienteScreen', { id_cita: code, paciente });
            setScannedData(null); // Limpiar para permitir nuevos escaneos después de la navegación
          },
        },
      ]
    );
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'Aceptar' }]);
  };

  // Verifica permisos
  if (hasPermission === null) {
    return <View style={styles.container}><Text>Solicitando permiso de la cámara...</Text></View>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No se tiene acceso a la cámara</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.scannerContainer}>
          <Camera
            style={StyleSheet.absoluteFillObject}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  scannerContainer: {
    width: '85%',
    height: 300,
    borderWidth: 2,
    borderColor: '#24A8AF',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
    justifyContent: 'center',
  },
});

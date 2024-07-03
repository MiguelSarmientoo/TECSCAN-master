import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

export default function ScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    getBarCodeScannerPermissions();
  }, []);

  const getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const handleBarCodeScanned = async ({ data }) => {
    if (scannedData === data) {
      return; // Si el mismo código se escanea de nuevo, no hace nada.
    }

    setScannedData(data);

    try {
      // Obtener detalles de la cita utilizando el ID escaneado
      const response = await axios.get(`https://c342-190-232-119-12.ngrok-free.app/citas/${data}`);
      const citaData = response.data;

      if (citaData) {
        // Utilizar el id_paciente de la cita para obtener más detalles del paciente
        const idPaciente = citaData.id_paciente;
        const pacienteResponse = await axios.get(`https://c342-190-232-119-12.ngrok-free.app/pacientes/${idPaciente}`);
        const pacienteData = pacienteResponse.data;

        if (pacienteData) {
          navigation.navigate('NewReportScreen', { id_cita: citaData.id, pacienteData });
          console.log('ID Cita:', citaData.id); // Verificar que se está pasando el id_cita
          setScannedData(null); // Limpiar el estado después de navegar

          Alert.alert(
            'Cita escaneada',
            `ID Cita: ${citaData.id}, ID Paciente: ${pacienteData.id}`,
            [
              {
                text: 'Scan Again',
                onPress: () => setScannedData(null),
              },
              {
                text: 'Ver Detalles',
                onPress: () => {
                  navigation.navigate('PacienteScreen', { id_cita: data, paciente: pacienteData });
                  setScannedData(null); // Limpiar el estado después de navegar
                },
              },
            ]
          );
        } else {
          Alert.alert('Error', 'No se encontraron datos para el paciente asociado a esta cita', [
            { text: 'Escanear de Nuevo', onPress: () => setScannedData(null) },
          ]);
        }
      } else {
        Alert.alert('Error', 'No se encontraron datos para la cita escaneada', [
          { text: 'Escanear de Nuevo', onPress: () => setScannedData(null) },
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo obtener la información de la cita', [
        { text: 'Escanear de Nuevo', onPress: () => setScannedData(null) },
      ]);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Solicitando permiso de la cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No se tiene acceso a la cámara</Text>
        <Button title="Conceder Permiso" onPress={getBarCodeScannerPermissions} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scannedData && (
        <View style={styles.scanAgainButton}>
          <Button title="Escanear de Nuevo" onPress={() => setScannedData(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0E21',
  },
  text: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 20,
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Animated, Easing } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import config from '../../config/config';

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanAnimation] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      startScanAnimation();
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    if (!isScanning || scannedData === data) return;
    setScannedData(data);
    
    try {
      const response = await axios.get(`${config.API_URL}/citas/${data}`);
      if (response.data) {
        const pacienteResponse = await axios.get(`${config.API_URL}/pacientes/${response.data.id_paciente}`);
        if (pacienteResponse.data) {
          navigation.navigate('PacienteScreen', { id_cita: data, paciente: pacienteResponse.data });
          setScannedData(null);
        } else {
          showAlert('Error', 'No se encontraron datos para el paciente asociado a esta cita');
        }
      } else {
        showAlert('Error', 'No se encontraron datos para la cita escaneada');
      }
    } catch {
      showAlert('Error', 'No se pudo obtener la información de la cita');
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: 'Aceptar', onPress: () => setScannedData(null) }]);
  };

  const startScanAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnimation, { toValue: 1, duration: 1500, easing: Easing.linear, useNativeDriver: false }), 
        Animated.timing(scanAnimation, { toValue: 0, duration: 1500, easing: Easing.linear, useNativeDriver: false }), 
      ])
    ).start();
  };

  const animatedScanLine = scanAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 300],
  });

  if (hasPermission === null) {
    return <View style={styles.container}><Text style={styles.text}>Solicitando permiso de la cámara...</Text></View>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No se tiene acceso a la cámara</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={() => BarCodeScanner.requestPermissionsAsync()}>
          <Text style={styles.permissionButtonText}>Conceder Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.scannerContainer}>
          <BarCodeScanner onBarCodeScanned={isScanning ? handleBarCodeScanned : undefined} style={StyleSheet.absoluteFillObject} />
          <Animated.View style={[styles.scanLine, { transform: [{ translateY: animatedScanLine }] }]} />
          <View style={styles.overlay} />
        </View>

        <TouchableOpacity style={styles.scanButton} onPress={() => { setIsScanning(true); setScannedData(null); }}>
          <Text style={styles.scanButtonText}>Escanear Ahora</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F5F5F5' },
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', // Centra verticalmente
    backgroundColor: '#F9F9F9' 
  },
  scannerContainer: {
    width: '85%',
    height: 300,
    borderWidth: 2,
    borderColor: '#24A8AF', // Color principal
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
    justifyContent: 'center', // Centra el escáner
  },
  overlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  scanLine: { position: 'absolute', width: '100%', height: 2, backgroundColor: '#24A8AF' }, // Color principal
  scanButton: {
    backgroundColor: '#24A8AF', // Color principal
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    marginTop: 30,
  },
  scanButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  permissionButton: {
    backgroundColor: '#24A8AF', // Color principal
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  permissionButtonText: { color: '#fff', fontSize: 16 },
});

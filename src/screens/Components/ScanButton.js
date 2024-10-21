// ScanButton.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window'); // Obtener ancho de la pantalla
const BUTTON_SIZE = 60; // Tamaño del botón, ajusta según sea necesario

const ScanButton = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.scanButton} onPress={onPress}>
        <Icon name="qrcode-scan" size={30} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.scanText}>Scan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0, // Mantiene el botón al fondo de la pantalla
    left: (width - BUTTON_SIZE) / 2, // Centra el botón horizontalmente
    marginBottom: 60, // Permite que la mitad sobresalga hacia arriba
  },
  scanButton: {
    backgroundColor: '#24A8AF', // Color de fondo del círculo
    borderRadius: BUTTON_SIZE / 2, // Redondea el botón
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Sombra del círculo
  },
  scanText: {
    color: '#576271',
    fontSize: 14, // Ajusta el tamaño del texto si es necesario
    position: 'absolute',
    top: '100%', // Mueve el texto justo debajo del círculo
    textAlign: 'center',
    width: '100%', // Centra el texto
    marginTop: 3, // Espacio entre el círculo y el texto
  },
});

export default ScanButton;
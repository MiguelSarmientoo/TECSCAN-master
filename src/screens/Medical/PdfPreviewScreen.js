import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import config from '../../config/config'; // Asegúrate de que esta ruta sea correcta

const PdfPreviewScreen = ({ route, navigation }) => {
  const { id_cita } = route.params;
  const [loading, setLoading] = useState(false);

  const downloadPdf = async () => {
    setLoading(true);

    // Paso 1: Solicitar permisos para acceder a la biblioteca de medios
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Error', 'Permiso denegado para acceder a la biblioteca de medios.');
      setLoading(false);
      return;
    }

    try {
      // Paso 2: Hacer la solicitud para generar el PDF
      const response = await fetch(`${config.API_URL}/encuestas/generate-pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_cita }),
      });

      if (!response.ok) {
        throw new Error('Error al generar el PDF');
      }

      // Paso 3: Descargar el PDF
      const uri = `${config.API_URL}/pdf/reporte_${id_cita}.pdf`;
      const localFile = `${FileSystem.documentDirectory}reporte_${id_cita}.pdf`;
      const downloadResponse = await FileSystem.downloadAsync(uri, localFile);

      if (downloadResponse.status !== 200) {
        throw new Error('No se pudo descargar el PDF.');
      }

      // Paso 4: Verificar si el archivo existe
      const fileInfo = await FileSystem.getInfoAsync(localFile);
      if (!fileInfo.exists) {
        throw new Error('El archivo no existe.');
      }

      // Paso 5: Guardar el archivo en la biblioteca de medios
      const asset = await MediaLibrary.createAssetAsync(fileInfo.uri);
      if (asset) {
        Alert.alert('Éxito', 'PDF descargado y guardado en la biblioteca.');
      } else {
        throw new Error('No se pudo crear el activo en la biblioteca.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message || 'No se pudo cargar el PDF.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Descargar PDF</Text>
      </View>
      <TouchableOpacity style={styles.downloadButton} onPress={downloadPdf}>
        <Text style={styles.buttonText}>Descargar PDF</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#4C9EEB" style={styles.loadingIndicator} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, flexDirection: 'row', alignItems: 'center' },
  backButton: { marginRight: 16, color: '#4C9EEB' },
  headerText: { fontSize: 20, fontWeight: 'bold' },
  loadingIndicator: { marginTop: 20 },
  downloadButton: {
    padding: 10,
    backgroundColor: '#4C9EEB',
    borderRadius: 5,
    margin: 16,
    alignItems: 'center',
  },
  buttonText: { color: '#fff' },
});

export default PdfPreviewScreen;

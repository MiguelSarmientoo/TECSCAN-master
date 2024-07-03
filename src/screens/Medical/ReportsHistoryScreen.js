// ReportsHistoryScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const ReportsHistoryScreen = ({ route }) => {
  const { id_cita } = route.params;
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`https://c342-190-232-119-12.ngrok-free.app/encuestas/by-cita/${id_cita}`);
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching details:', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.detailItem}
      onPress={() => navigation.navigate('PdfPreview', { htmlContent: generateHTML(item) })}
    >
      <Text style={styles.detailText}>Detalles de Encuesta ID: {item.id}</Text>
      {/* Mostrar otros campos relevantes de detalles de encuesta */}
    </TouchableOpacity>
  );

  const generateHTML = (detail) => {
    // Generar el contenido HTML del detalle de encuesta si es necesario
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={details}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E21',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  detailItem: {
    backgroundColor: '#1C1C3C',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReportsHistoryScreen;

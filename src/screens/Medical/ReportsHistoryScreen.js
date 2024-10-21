import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import * as Linking from 'expo-linking';
import config from '../../config/config';

const ReportsHistoryScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/reportes`);
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error.message);
    }
  };

  const openPdf = (id_cita) => {
    const pdfUrl = `${config.API_URL}/pdf/reporte_${id_cita}.pdf`;
    Linking.openURL(pdfUrl).catch(err => console.error('Error al abrir el PDF:', err));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openPdf(item.cita_id)}>
      <View style={styles.cardContent}>
        <Icon name="file-document-outline" size={30} color="#24A8AF" style={styles.cardIcon} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>Reporte N°: {item.id}</Text>
          <Text style={styles.cardDate}>
            {new Date(item.fecha_creacion).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
      </View>
      <Icon name="chevron-right" size={30} color="#24A8AF" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={reports}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F8', // Fondo suave
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Asegura que el contenido ocupe el espacio restante
  },
  cardIcon: {
    marginRight: 15,
  },
  cardTextContainer: {
    flexShrink: 1, // Esto permite que el texto se ajuste y no empuje el ícono
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ReportsHistoryScreen;

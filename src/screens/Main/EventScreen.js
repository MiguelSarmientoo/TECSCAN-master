import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native'; // Importar para obtener el parámetro
import config from '../../config/config'; // Asegúrate de que la ruta sea correcta

const EventScreen = () => {
  const [citas, setCitas] = useState([]);
  const route = useRoute(); // Obtener la información de la ruta
  const { selectedDate } = route.params; // Obtener el día seleccionado desde HomeScreen

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await fetch(`${config.API_URL}/citas`); // Utiliza la URL centralizada
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const citasData = await response.json();
      
      // Filtrar las citas por la fecha seleccionada
      const citasForSelectedDate = citasData.filter(cita => {
        const citaDate = new Date(cita.fecha).toISOString().split('T')[0];
        return citaDate === selectedDate;
      });

      const citasWithPacientes = await Promise.all(
        citasForSelectedDate.map(async (cita) => {
          try {
            const pacienteResponse = await fetch(`${config.API_URL}/pacientes/${cita.id_paciente}`); // Utiliza la URL centralizada
            if (!pacienteResponse.ok) {
              throw new Error('Error al obtener datos del paciente');
            }
            const pacienteData = await pacienteResponse.json();
            return {
              ...cita,
              pacienteNombre: `${pacienteData.nombre}`,
            };
          } catch (error) {
            console.error(`Error fetching paciente data for cita ${cita.id}:`, error);
            return cita; // Si hay un error, devolvemos la cita sin pacienteNombre
          }
        })
      );
      setCitas(citasWithPacientes);
    } catch (error) {
      console.error('Error fetching citas:', error);
    }
  };

  const renderCitaItem = ({ item }) => (
    <View style={styles.citaItem}>
      <Text style={styles.citaText}>Fecha: {item.fecha}</Text>
      <Text style={styles.citaText}>Hora: {item.hora}</Text>
      <Text style={styles.citaText}>Motivo: {item.motivo}</Text>
      {item.pacienteNombre ? (
        <Text style={styles.citaText}>Paciente: {item.pacienteNombre}</Text>
      ) : (
        <Text style={styles.citaText}>Paciente: No disponible</Text>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Citas para el {selectedDate}</Text>
      <FlatList
        data={citas}
        renderItem={renderCitaItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay citas para esta fecha</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light background
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Black text for light mode
    marginBottom: 20,
    textAlign: 'center',
  },
  citaItem: {
    backgroundColor: '#E0E0E0', // Light item background
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  citaText: {
    color: '#000', // Black text for light mode
    fontSize: 16,
    marginBottom: 5,
  },
  emptyText: {
    color: '#000', // Black text for empty state
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EventScreen;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const EventScreen = () => {
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    try {
      const response = await fetch('https://c342-190-232-119-12.ngrok-free.app/citas');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const citasData = await response.json();
      // Iterar por cada cita para obtener el nombre del paciente
      const citasWithPacientes = await Promise.all(
        citasData.map(async (cita) => {
          try {
            const pacienteResponse = await fetch(`https://c342-190-232-119-12.ngrok-free.app/pacientes/${cita.id_paciente}`);
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
      <Text style={styles.heading}>Citas Pendientes</Text>
      <FlatList
        data={citas}
        renderItem={renderCitaItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay citas pendientes</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E21',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  citaItem: {
    backgroundColor: '#1C1C3C',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  citaText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EventScreen;

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ username, onLogout }) => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('https://backend-tecscan-production.up.railway.app/pacientes');
        setPacientes(response.data);
      } catch (error) {
        console.error('Error fetching pacientes:', error);
      }
    };

    fetchPacientes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido {username}!</Text>
      <Button title="Cerrar sesión" onPress={onLogout} />
      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nombre} {item.apellido}</Text>
            <Text>Edad: {item.edad}</Text>
            <Text>Género: {item.genero}</Text>
            <Text>Dirección: {item.direccion}</Text>
            <Text>Teléfono: {item.telefono}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HomeScreen;

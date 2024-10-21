import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ContactInfoScreen = ({ route, navigation }) => {
  const { paciente } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#4C9EEB" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Información de Contacto</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Nombre Completo:</Text>
          <Text style={styles.value}>{paciente.nombre}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.value}>{paciente.edad}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Género:</Text>
          <Text style={styles.value}>{paciente.genero}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{paciente.telefono || 'No disponible'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{paciente.email || 'No disponible'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Dirección:</Text>
          <Text style={styles.value}>{paciente.direccion || 'No disponible'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Fecha de Nacimiento:</Text>
          <Text style={styles.value}>
            {paciente.fecha_nacimiento ? new Date(paciente.fecha_nacimiento).toDateString() : 'No disponible'}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Estado Civil:</Text>
          <Text style={styles.value}>{paciente.estado_civil || 'No disponible'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Ocupación:</Text>
          <Text style={styles.value}>{paciente.ocupacion || 'No disponible'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Antecedentes Médicos:</Text>
          <Text style={styles.value}>{paciente.antecedentes_medicos || 'No disponible'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Alergias:</Text>
          <Text style={styles.value}>{paciente.alergias || 'No disponible'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Grupo Sanguíneo:</Text>
          <Text style={styles.value}>{paciente.grupo_sanguineo || 'No disponible'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>Notas Adicionales:</Text>
          <Text style={styles.value}>{paciente.notas_adicionales || 'No disponible'}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>ID de Identificación:</Text>
          <Text style={styles.value}>{paciente.dni || 'No disponible'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 2,
    paddingTop: 50,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#4C9EEB',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoBox: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 1,
  },
  label: {
    fontSize: 16,
    color: '#4C9EEB',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
  },
});

export default ContactInfoScreen;

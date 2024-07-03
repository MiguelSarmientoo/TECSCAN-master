import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PacienteScreen = ({ route, navigation }) => {
  const { paciente, id_cita } = route.params; // Asegúrate de obtener id_cita desde route.params

  const navigateToNewReport = () => {
    navigation.navigate('NewReportScreen', { id_cita }); // Pasar id_cita a NewReportScreen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Opciones de Paciente</Text>
      </View>
      <Text style={styles.patientName}>ID: {id_cita}</Text>
      <Text style={styles.patientName}>{paciente ? paciente.nombre : 'Nombre del paciente'}</Text>
      <View style={styles.options}>
        <TouchableOpacity style={styles.optionButton} onPress={navigateToNewReport}>
          <Icon name="file-document-outline" size={30} color="#fff" />
          <Text style={styles.optionText}>Nuevo Reporte</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('ContactInfo', { paciente, id_cita })}
        >
          <Icon name="account-box-outline" size={30} color="#fff" />
          <Text style={styles.optionText}>Información de Contacto</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('ReportsHistory', { id_cita})}
        >
          <Icon name="history" size={30} color="#fff" />
          <Text style={styles.optionText}>Historial de Reportes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E21',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C3C',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  patientName: {
    fontSize: 19,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  options: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#1C1C3C',
    padding: 20,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
});

export default PacienteScreen;

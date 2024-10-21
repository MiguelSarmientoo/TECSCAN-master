import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PacienteScreen = ({ route, navigation }) => {
  const { paciente, id_cita } = route.params || {};

  const navigateToNewReport = () => {
    navigation.navigate('NewReportScreen', { id_cita, paciente });
  };

  const navigateToPreviousReports = () => {
    navigation.navigate('ReportsHistory', { id_cita, paciente });
  };

  const fechaNacimiento = paciente?.fecha_nacimiento ? new Date(paciente.fecha_nacimiento) : null;

  return (
    <SafeAreaView style={styles.container}>
      {paciente && (
        <View style={styles.patientInfo}>
          <Text style={styles.patientLabel}>Nombre de paciente:</Text>
          <Text style={styles.patientName}>{paciente.nombre}</Text>
          
          {/* Tabla con más padding */}
          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.label}>Edad:</Text>
              <Text style={styles.value}>{paciente.edad}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Género:</Text>
              <Text style={styles.value}>{paciente.genero}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Teléfono:</Text>
              <Text style={styles.value}>{paciente.telefono || 'No disponible'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{paciente.email || 'No disponible'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Dirección:</Text>
              <Text style={styles.value}>{paciente.direccion || 'No disponible'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Fecha de Nacimiento:</Text>
              <Text style={styles.value}>
                {fechaNacimiento ? fechaNacimiento.toDateString() : 'No disponible'}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Estado Civil:</Text>
              <Text style={styles.value}>{paciente.estado_civil || 'No disponible'}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Ocupación:</Text>
              <Text style={styles.value}>{paciente.ocupacion || 'No disponible'}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Footer con botones más cercanos al contenido */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.optionButton} onPress={navigateToNewReport}>
          <Icon name="file-document-outline" size={25} color="#24A8AF" />
          <Text style={styles.optionText}>Nuevo Reporte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={navigateToPreviousReports}>
          <Icon name="folder-outline" size={25} color="#24A8AF" />
          <Text style={styles.optionText}>Ver Reportes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA',
    padding: 10,
  },
  patientInfo: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    paddingBottom: 20,
  },
  patientLabel: {
    fontSize: 18,
    color: '#1C1C3C',
    fontWeight: '600',
  },
  patientName: {
    fontSize: 24,
    color: '#24A8AF',
    fontWeight: 'bold',
    marginTop: 5,
  },
  table: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 15, // Reducido para dar más espacio en los bordes
    paddingVertical: 10, // Añadido para espaciar los elementos
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10, // Incrementado para más separación entre filas
    borderBottomWidth: 1,
    borderColor: '#EAEAEA',
  },
  label: {
    fontSize: 16,
    color: '#24A8AF', // Color de las etiquetas
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: '#333', // Color oscuro para los valores
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#24A8AF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  optionText: {
    color: '#24A8AF',
    fontSize: 16,
    marginLeft: 5,
    textAlign: 'center',
  },
});

export default PacienteScreen;

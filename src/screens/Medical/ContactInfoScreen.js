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
          <Icon name="arrow-left" size={30} color="#fff" />
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
          <Text style={styles.label}>Contacto:</Text>
          <Text style={styles.value}>{paciente.telefono}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.label}>ID de Identificación:</Text>
          <Text style={styles.value}>{paciente.numero_identificacion}</Text>
        </View>
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
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  infoBox: {
    backgroundColor: '#1C1C3C',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#4C9EEB',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
});

export default ContactInfoScreen;

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PreviewScreen = ({ route, navigation }) => {
    const { formData, idCita } = route.params; // Recibe idCita y formData desde route.params
  
    const handleSaveData = async () => {
      try {
        const response = await fetch('https://c342-190-232-119-12.ngrok-free.app/encuestas', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_cita: idCita, // Id de la cita del paciente
            nivel_salud: formData.nivel_salud,
            comentarios: formData.comentarios,
            presion_arterial_sistolica: formData.presion_arterial_sistolica,
            presion_arterial_diastolica: formData.presion_arterial_diastolica,
            frecuencia_cardiaca: formData.frecuencia_cardiaca,
            frecuencia_respiratoria: formData.frecuencia_respiratoria,
            peso: formData.peso,
            altura: formData.altura,
            imc: formData.imc,
            diagnostico: formData.diagnostico,
            tratamiento: formData.tratamiento,
            nivel_dolor: formData.nivel_dolor,
            alergias: formData.alergias,
            medicamentos_actuales: formData.medicamentos_actuales,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Error al guardar los datos');
        }
  
        Alert.alert('Datos guardados correctamente');
        // Puedes agregar lógica adicional después de guardar los datos, como navegar a otra pantalla o actualizar el estado.
      } catch (error) {
        console.error('Error al guardar los datos:', error);
        Alert.alert('Error', 'No se pudieron guardar los datos');
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {Object.keys(formData).map((key, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.label}>{key}</Text>
              <Text style={styles.value}>{formData[key]}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveData}>
            <Text style={styles.buttonText}>Guardar Datos de Encuesta</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  };
  

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0E21',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    itemContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        color: '#4C9EEB',
        marginBottom: 5,
    },
    value: {
        fontSize: 20,
        color: '#fff',
    },
    saveButton: {
        backgroundColor: '#1C1C3C',
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PreviewScreen;

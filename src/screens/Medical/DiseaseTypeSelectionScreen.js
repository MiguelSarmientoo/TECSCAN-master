import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DiseaseTypeSelectionScreen = ({ navigation }) => {
  const handleTypeSelection = async (type) => {
    try {
      // Guarda el tipo de enfermedad seleccionado en AsyncStorage
      await AsyncStorage.setItem('selectedDiseaseType', type);
      navigation.navigate('DocumentForm'); // Navega a la siguiente pantalla
    } catch (error) {
      console.error('Error al guardar el tipo de enfermedad:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Selecciona el tipo de enfermedad:</Text>
      <Button title="Enfermedad A" onPress={() => handleTypeSelection('A')} />
      <Button title="Enfermedad B" onPress={() => handleTypeSelection('B')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DiseaseTypeSelectionScreen;

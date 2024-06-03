import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DiseaseTypeSelectionScreen = ({ navigation }) => {
  const handleTypeSelection = (type) => {
    // Implementa la lógica para guardar el tipo de enfermedad seleccionado
    navigation.navigate('DocumentForm'); // Navega a la siguiente pantalla
  };

  return (
    <View style={styles.container}>
      <Text>Selecciona el tipo de enfermedad:</Text>
      <Button title="Enfermedad A" onPress={() => handleTypeSelection('A')} />
      <Button title="Enfermedad B" onPress={() => handleTypeSelection('B')} />
      {/* Agrega más botones para otros tipos de enfermedades */}
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

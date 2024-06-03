import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const DocumentFormScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    // Inicializa los campos del formulario según sea necesario
  });

  const handleSaveDocument = () => {
    // Implementa la lógica para guardar el documento
    navigation.navigate('Preview', { formData }); // Navega a la pantalla de previsualización con los datos del formulario
  };

  return (
    <View style={styles.container}>
      <Text>Rellena el formulario:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(value) => setFormData({ ...formData, field1: value })}
        value={formData.field1}
        placeholder="Campo 1"
      />
      {/* Agrega más campos de formulario según sea necesario */}
      <Button title="Guardar" onPress={handleSaveDocument} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default DocumentFormScreen;

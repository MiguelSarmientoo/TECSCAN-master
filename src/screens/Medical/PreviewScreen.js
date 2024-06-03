import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PreviewScreen = ({ route }) => {
  const { formData } = route.params;

  return (
    <View style={styles.container}>
      <Text>Previsualización:</Text>
      <Text>{JSON.stringify(formData)}</Text>
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

export default PreviewScreen;

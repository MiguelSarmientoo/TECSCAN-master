import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: 'transparent', // Ajusta el color según necesites
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333', // Cambia el color según tu paleta
  },
});

export default Header;

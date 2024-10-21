import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScanButton from './ScanButton'; // Asegúrate de que el path sea correcto

const Navbar = ({ onHomePress, onScanQRPress, onProfilePress, isHomeSelected, isProfileSelected }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={onHomePress}
        >
          <Icon name="home" size={30} color={isHomeSelected ? "#24A8AF" : "#576271"} />
          <Text style={[styles.navButtonText, isHomeSelected && styles.selectedText]}>Home</Text>
        </TouchableOpacity>

        <ScanButton onPress={onScanQRPress} />

        <TouchableOpacity 
          style={styles.navButton} 
          onPress={onProfilePress}
        >
          <Icon name="account" size={30} color={isProfileSelected ? "#24A8AF" : "#576271"} />
          <Text style={[styles.navButtonText, isProfileSelected && styles.selectedText]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0, // Esto asegura que el SafeAreaView ocupe solo el espacio necesario
    backgroundColor: '#FFFFFF',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 5,
    paddingVertical: 10,
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  navButtonText: {
    color: '#576271',
    fontSize: 14,
    marginTop: 6,
  },
  selectedText: {
    color: '#24A8AF',
    fontWeight: 'bold',
  },
});

export default Navbar;

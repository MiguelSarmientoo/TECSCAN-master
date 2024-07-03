// HomeScreen.js
import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../../contexts/UserContext';

const HomeScreen = ({ navigation }) => {
  const { medico } = useContext(UserContext);

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleScanQR = () => {
    navigation.navigate('ScanScreen');
  };

  const handleEvent = () => {
    navigation.navigate('EventScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome,</Text>
        <Text style={styles.userName}>{medico ? `${medico.nombre} ${medico.apellido}` : 'Guest'}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={handleEvent}>
          <Icon name="calendar-check" size={40} color="#fff" />
          <Text style={styles.buttonText}>Event</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Contact', 'Contact Functionality')}>
          <Icon name="account" size={40} color="#fff" />
          <Text style={styles.buttonText}>Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Business', 'Business Functionality')}>
          <Icon name="office-building" size={40} color="#fff" />
          <Text style={styles.buttonText}>Business</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={30} color="#fff" />
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={handleScanQR}>
          <Icon name="qrcode-scan" size={30} color="#4C9EEB" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('History')}>
          <Icon name="history" size={30} color="#fff" />
          <Text style={styles.navButtonText}>History</Text>
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
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
  },
  userName: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  content: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1C1C3C',
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  navbar: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#0A0E21',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 10,
  },
  navButton: {
    alignItems: 'center',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default HomeScreen;

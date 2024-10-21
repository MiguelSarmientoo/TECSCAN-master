import React, { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Navbar from '../Components/NavbarHome'; // Asegúrate de que el path sea correcto
import { UserContext } from '../../contexts/UserContext';

const ProfileScreen = ({ navigation }) => {
  const { medico, setMedico } = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null, // Elimina el botón de retroceso
      headerTitleAlign: 'center', // Centra el título en el header
    });
  }, [navigation]);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí', onPress: () => {
          setMedico(null);
          navigation.replace('Login');
        }},
      ],
      { cancelable: true }
    );
  };

  const handleScanQR = () => {
    navigation.navigate('ScanScreen');
  };

  const handleProfile = () => {
    navigation.navigate('MedicalProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg' }}
              style={styles.userImage}
            />
          </View>

          <View style={styles.infoRow}>
            <Icon name="account" size={26} color="#24A8AF" />
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>Dr. {medico ? `${medico.nombre} ${medico.apellido}` : 'Invitado'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="medical-bag" size={26} color="#24A8AF" />
            <Text style={styles.label}>Especialidad:</Text>
            <Text style={styles.value}>{medico?.especialidad || 'Especialidad no disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="email" size={26} color="#24A8AF" />
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{medico?.email || 'Email no disponible'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="phone" size={26} color="#24A8AF" />
            <Text style={styles.label}>Teléfono:</Text>
            <Text style={styles.value}>{medico?.telefono || 'Teléfono no disponible'}</Text>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={22} color="#24A8AF" style={styles.logoutIcon} />
            <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Navbar
        onHomePress={() => navigation.navigate('Home')}
        onScanQRPress={handleScanQR}
        onProfilePress={handleProfile}
        isHomeSelected={false} // Cambia esto a false
        isProfileSelected={true} // Indica que estamos en la pantalla de perfil
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 25, // Aumentado el padding interno para que los elementos se vean más espaciados y centrados
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 30, // Aumenta la separación entre la imagen y el resto del contenido
    borderRadius: 50,
    overflow: 'hidden',
    width: 120,
    height: 120, // Aumenta el tamaño de la imagen
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Más separación entre cada campo
    width: '100%',
    paddingHorizontal: 10, // Agrega más espacio horizontal
  },
  label: {
    fontSize: 16, // Aumentado el tamaño de la fuente para que destaque más
    fontWeight: '600',
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 5, // Aumenta el margen superior para dar más aire
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12, // Aumentado el padding del botón
    borderWidth: 1,
    borderColor: '#24A8AF', // Añadido borde de color primario
    borderRadius: 5,
    width: '100%',
  },
  logoutButtonText: {
    color: '#24A8AF',
    fontSize: 16, // Aumentado el tamaño del texto del botón
    fontWeight: '500',
    marginLeft: 8,
  },
  logoutIcon: {
    color: '#24A8AF',
  },
});

export default ProfileScreen;

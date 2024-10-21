import React, { useContext } from 'react'; 
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { UserContext } from '../../contexts/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const { width } = Dimensions.get('window');

const Header = () => {
  const { medico } = useContext(UserContext);
  const userName = medico ? `Dr. ${medico.nombre} ${medico.apellido}` : 'Guest';
  const userSpecialty = medico?.especialidad;

  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <View style={styles.textContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userName}>{userName}</Text>
          {userSpecialty && (
            <View style={styles.specialtyContainer}>
              <Icon name="stethoscope" size={16} color="#24A8AF" />
              <Text style={styles.userSpecialty}>{userSpecialty}</Text>
            </View>
          )}
        </View>
        <Image
          source={{ uri: 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg' }}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.2, 
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 10, // Reducir padding vertical
    paddingHorizontal: width * 0.10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height:7 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'column',
    width: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    width: 80, 
    height: 80,
    borderRadius: 40,
  },
  textContainer: {
    justifyContent: 'flex-start',
  },
  welcomeText: {
    fontSize: width * 0.07, // Tamaño mayor y en negrita
    fontWeight: 'bold',
    color: '#24A8AF',
  },
  userName: {
    fontSize: width * 0.045, // Tamaño menor para el nombre del usuario
    color: '#0A0E21',
    marginTop: 1,
    fontWeight: '400',
  },
  specialtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  userSpecialty: {
    fontSize: width * 0.04, // Tamaño menor para la especialidad
    color: '#24A8AF',
    fontWeight: '300',
    marginLeft: 5,
  },
});

export default Header;

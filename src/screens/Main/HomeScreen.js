import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/HeaderComponent';
import Navbar from '../Components/NavbarHome';
import { Agenda } from 'react-native-calendars'; 
import { UserContext } from '../../contexts/UserContext';
import config from '../../config/config';

const HomeScreen = ({ navigation }) => {
  const { medico } = useContext(UserContext);
  const [citasPendientes, setCitasPendientes] = useState({});

  const getCitasPendientes = async (id_medico) => {
    try {
      const response = await fetch(`${config.API_URL}/citas/medico/${id_medico
      }`);
      if (!response.ok) throw new Error('Error de red');
      const citasData = await response.json();

      const citasConPacientes = await Promise.all(citasData.map(async (cita) => {
        const pacienteResponse = await fetch(`${config.API_URL}/pacientes/${cita.id_paciente}`);
        if (pacienteResponse.ok) {
          const pacienteData = await pacienteResponse.json();
          return {
            ...cita,
            nombrePaciente: pacienteData.nombre,
          };
        }
        return {
          ...cita,
          nombrePaciente: 'Cita pendiente',
        };
      }));

      return citasConPacientes;
    } catch (error) {
      console.error('Error fetching citas:', error);
      Alert.alert('Error', 'No se pudieron obtener las citas pendientes.');
      return [];
    }
  };

  useEffect(() => {
    const fetchCitas = async () => {
      const fetchedCitas = await getCitasPendientes(medico.id);
      const citasPorFecha = {};
      fetchedCitas.forEach(cita => {
        const date = new Date(cita.fecha).toISOString().split('T')[0];
        if (!citasPorFecha[date]) {
          citasPorFecha[date] = [];
        }
        citasPorFecha[date].push(cita);
      });
      setCitasPendientes(citasPorFecha);
    };
    fetchCitas();
  }, [medico]);

  const formatHour = (hora) => {
    const [hour, minutes] = hora.split(':');
    const hours24 = parseInt(hour, 10);
    const isPM = hours24 >= 12;
    const formattedHour = ((hours24 + 11) % 12 + 1) + ':' + minutes + ' ' + (isPM ? 'pm' : 'am');
    return formattedHour;
  };

  const renderItem = (item) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>
          <Text style={styles.boldText}>Cita pendiente: </Text>
          {`${formatHour(item.hora)} - ${item.nombrePaciente}`}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Agenda
          items={citasPendientes}
          loadItemsForMonth={month => {
            console.log('Cargando items para el mes', month);
          }}
          onDayPress={day => {
            console.log('Día presionado:', day);
          }}
          selected={new Date().toISOString().split('T')[0]}
          renderItem={renderItem}
          renderEmptyData={() => (
            <View style={styles.emptyData}>
              <Text>No hay citas para mostrar</Text>
            </View>
          )}
          onRefresh={() => console.log('Refrescando...')}
          refreshing={false}
          theme={{
            agendaDayTextColor: '#576271', // Color de texto de los días
            agendaTodayColor: '#24A8AF', // Color para resaltar hoy
            agendaKnobColor: '#24A8AF', // Color del knob
            monthTextColor: '#24A8AF', // Color del mes
            agendaTextColor: '#576271', // Color del texto de la agenda
            backgroundColor: '#FFFFFF', // Fondo del calendario
            dayTextColor: '#576271', // Color del texto de los días
            textSectionTitleColor: '#24A8AF', // Color del título de la sección
            selectedDayBackgroundColor: '#24A8AF', // Color de fondo del día seleccionado
            selectedDayTextColor: '#FFFFFF', // Color del texto del día seleccionado
          }}          
          style={styles.agenda}
        />
      </View>
      <Navbar
        onHomePress={() => navigation.navigate('Home')}
        onScanQRPress={() => navigation.navigate('ScanScreen')}
        onProfilePress={() => navigation.navigate('MedicalProfile')}
        isHomeSelected={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 0.8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
  },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginVertical: 8,
    width: '95%',
  },
  itemText: {
    fontSize: 18,
    color: '#333',
  },
  boldText: {
    fontWeight: 'bold',
  },
  emptyData: {
    padding: 20,
    alignItems: 'center',
  },
  agenda: {
    width: '100%',
  },
});

export default HomeScreen;

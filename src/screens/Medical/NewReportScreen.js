import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const NewReportScreen = ({ navigation, route }) => {
  const [formData, setFormData] = useState({
    nivel_salud: '',
    comentarios: '',
    presion_arterial_sistolica: '',
    presion_arterial_diastolica: '',
    frecuencia_cardiaca: '',
    frecuencia_respiratoria: '',
    peso: '',
    altura: '',
    imc: '',
    diagnostico: '',
    tratamiento: '',
    nivel_dolor: '',
    alergias: '',
    medicamentos_actuales: '',
  });

  const { id_cita, pacienteData } = route.params;
  console.log('ID Cita recibido:', route.params.id_cita); // Agregado para verificar el id_cita recibido

  const fields = [
    { key: 'nivel_salud', label: 'Nivel de Salud', placeholder: 'Seleccione el nivel de salud', icon: 'heart-pulse' },
    { key: 'comentarios', label: 'Comentarios', placeholder: 'Ingrese comentarios', icon: 'comment' },
    { key: 'presion_arterial_sistolica', label: 'Presión Arterial Sistólica', placeholder: 'Ingrese presión arterial sistólica', icon: 'blood-bag' },
    { key: 'presion_arterial_diastolica', label: 'Presión Arterial Diastólica', placeholder: 'Ingrese presión arterial diastólica', icon: 'blood-bag' },
    { key: 'frecuencia_cardiaca', label: 'Frecuencia Cardíaca', placeholder: 'Ingrese frecuencia cardíaca', icon: 'heart' },
    { key: 'frecuencia_respiratoria', label: 'Frecuencia Respiratoria', placeholder: 'Ingrese frecuencia respiratoria', icon: 'lungs' },
    { key: 'peso', label: 'Peso (kg)', placeholder: 'Ingrese el peso en kilogramos', icon: 'weight' },
    { key: 'altura', label: 'Altura (cm)', placeholder: 'Ingrese la altura en centímetros', icon: 'human-male-height' },
    { key: 'imc', label: 'IMC', placeholder: 'Ingrese el IMC', icon: 'calculator' },
    { key: 'diagnostico', label: 'Diagnóstico', placeholder: 'Ingrese el diagnóstico', icon: 'stethoscope' },
    { key: 'tratamiento', label: 'Tratamiento', placeholder: 'Ingrese el tratamiento', icon: 'pill' },
    { key: 'nivel_dolor', label: 'Nivel de Dolor', placeholder: 'Seleccione el nivel de dolor', icon: 'thermometer' },
    { key: 'alergias', label: 'Alergias', placeholder: 'Ingrese alergias', icon: 'alert-circle' },
    { key: 'medicamentos_actuales', label: 'Medicamentos Actuales', placeholder: 'Ingrese medicamentos actuales', icon: 'pill' },
  ];

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handlePickerChange = (itemValue, key) => {
    setFormData({
      ...formData,
      [key]: itemValue,
    });
  };

  const handleSubmit = () => {
    try {
      console.log('Datos del formulario:', formData); // Agregado para mostrar los datos del formulario
      navigation.navigate('PreviewScreen', { idCita: id_cita, formData: formData });
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      Alert.alert('Error', 'No se pudo procesar el formulario');
    }
  };

  const renderPickerItem = (label, key, values) => (
    <View style={styles.pickerContainer}>
      <Text style={styles.pickerLabel}>{label}</Text>
      <TouchableOpacity
        style={styles.pickerTouchable}
        onPress={() => {}}
      >
        <Text style={styles.pickerPlaceholder}>{formData[key] ? formData[key] : fields.find(field => field.key === key)?.placeholder}</Text>
      </TouchableOpacity>
      {key === 'nivel_salud' && (
        <Picker
          selectedValue={formData[key]}
          onValueChange={(itemValue) => handlePickerChange(itemValue, key)}
          style={styles.picker}
        >
          {values.map((value, index) => (
            <Picker.Item key={index.toString()} label={value} value={value} color="#fff" />
          ))}
        </Picker>
      )}
      {key === 'nivel_dolor' && (
        <Picker
          selectedValue={formData[key]}
          onValueChange={(itemValue) => handlePickerChange(itemValue, key)}
          style={styles.picker}
        >
          {values.map((value, index) => (
            <Picker.Item key={index.toString()} label={value} value={value} color="#fff" />
          ))}
        </Picker>
      )}
    </View>
  );

  const renderTextBox = (label, key, placeholder, icon, keyboardType = 'default') => (
    <View style={styles.inputGroup}>
      <Icon name={icon} size={24} color="#4C9EEB" style={styles.inputIcon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={formData[key]}
        keyboardType={keyboardType}
        onChangeText={(text) => handleInputChange(key, text)}
      />
    </View>
  );

  const renderFormItems = () => {
    return fields.map((item, index) => (
      <View key={index.toString()} style={styles.slide}>
        <View style={styles.formGroup}>
          {item.key === 'nivel_salud' ? (
            renderPickerItem(item.label, item.key, ['Malo', 'Bueno'])
          ) : item.key === 'nivel_dolor' ? (
            renderPickerItem(item.label, item.key, ['Bajo', 'Alto'])
          ) : item.key === 'altura' || item.key === 'imc' || item.key === 'peso' || item.key === 'presion_arterial_sistolica' || item.key === 'presion_arterial_diastolica' || item.key === 'frecuencia_cardiaca' || item.key === 'frecuencia_respiratoria' ? (
            renderTextBox(item.label, item.key, item.placeholder, item.icon, 'numeric')
          ) : (
            renderTextBox(item.label, item.key, item.placeholder, item.icon)
          )}
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Nuevo Reporte</Text>
      </View>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {renderFormItems()}
      </Animated.ScrollView>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0E21',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C3C',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    backgroundColor: '#1C1C3C',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4C9EEB',
    width: 260,
  },
  pickerContainer: {
    backgroundColor: '#1C1C3C',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4C9EEB',
    marginBottom: 20,
  },
  pickerLabel: {
    color: '#4C9EEB',
    fontSize: 18,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  pickerTouchable: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  pickerPlaceholder: {
    color: '#fff',
    fontSize: 18,
  },
  picker: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#4C9EEB',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    margin: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NewReportScreen;

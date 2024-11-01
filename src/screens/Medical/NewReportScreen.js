import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';

const NewReportScreen = ({ navigation, route }) => {
  const { id_cita, paciente } = route.params;

  // Estado del formulario
  const [formData, setFormData] = useState({
    motivo_consulta: '',
    tratamiento_previo: '',
    medicamentos_actuales: '',
    condiciones_medicas: '',
    estado_emocional: '',
    sintomas_emocionales: '',
    nivel_estres: '',
    relacion_familiar: '',
    red_apoyo: '',
    situacion_laboral: '',
    actividad_fisica: '',
    patrones_sueno: '',
    alimentacion: '',
    objetivos_terapia: '',
    cambios_deseados: '',
    habilidades_deseadas: '',
    comentarios: '',
  });

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    try {
      console.log('Datos del formulario:', formData);
      // Navega a PreviewScreen con los datos
      navigation.navigate('Preview', { formData, id_cita });
    } catch (error) {
      console.error('Error al procesar el formulario:', error);
      Alert.alert('Error', 'No se pudo procesar el formulario');
    }
  };

  const renderTextBox = (label, key, placeholder, icon) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{label}</Text>
      <View style={styles.inputGroup}>
        <Icon name={icon} size={24} color="#4A90E2" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={formData[key]}
          onChangeText={(text) => handleInputChange(key, text)}
          multiline={true}
          numberOfLines={2}
        />
      </View>
      {renderQuickResponses(key)}
    </View>
  );

  const renderPicker = (label, key, icon, options) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{label}</Text>
      <View style={styles.inputGroup}>
        <Icon name={icon} size={24} color="#4A90E2" style={styles.inputIcon} />
        <Picker
          selectedValue={formData[key]}
          style={styles.picker}
          onValueChange={(itemValue) => handleInputChange(key, itemValue)}
        >
          <Picker.Item label="Seleccione una opción" value="" />
          {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
      {renderQuickResponses(key)}
    </View>
  );

  const renderQuickResponses = (key) => {
    const responses = {
      motivo_consulta: [
        'Siento una constante ansiedad ante situaciones cotidianas.',
        'He tenido episodios frecuentes de tristeza que duran varios días.',
        'Me cuesta concentrarme en mi trabajo y me siento desmotivado/a.',
      ],
      tratamiento_previo: [
        'He recibido terapia psicológica anteriormente durante varios meses.',
        'Actualmente estoy en tratamiento psiquiátrico y tomando medicación.',
        'No he recibido tratamientos previos para problemas emocionales.',
      ],
      medicamentos_actuales: [
        'Estoy tomando antidepresivos bajo prescripción médica.',
        'Actualmente no tomo medicación, pero lo he hecho anteriormente.',
        'No estoy tomando ningún tipo de medicamento actualmente.',
      ],
      condiciones_medicas: [
        'Tengo una condición médica crónica que afecta mi bienestar mental.',
        'Estoy en tratamiento por hipertensión y lo manejo con medicamentos.',
        'No tengo ninguna condición médica relevante actualmente.',
      ],
      estado_emocional: [
        'Me siento emocionalmente inestable, con cambios de humor frecuentes.',
        'Mi estado emocional es mayormente estable, pero con episodios de ansiedad.',
        'Me siento en equilibrio emocional la mayor parte del tiempo.',
      ],
      sintomas_emocionales: [
        'Tengo problemas para dormir y me despierto con frecuencia durante la noche.',
        'Siento una constante irritabilidad que afecta mis relaciones personales.',
        'He notado una baja energía y falta de motivación en mi día a día.',
      ],
      relacion_familiar: [
        'Tengo una relación distante con mi familia, y la comunicación es limitada.',
        'Mi relación familiar es buena, aunque con algunas tensiones ocasionales.',
        'Disfruto de una relación cercana y de apoyo con mi familia.',
      ],
      red_apoyo: [
        'Cuento con una red de apoyo sólida, principalmente amigos y colegas.',
        'Mi red de apoyo es limitada, pero tengo a algunas personas cercanas.',
        'No tengo una red de apoyo significativa en este momento.',
      ],
      situacion_laboral: [
        'Estoy desempleado/a actualmente y eso ha incrementado mi ansiedad.',
        'Tengo un empleo, pero la incertidumbre me genera estrés constante.',
        'Mi situación laboral es estable y me siento satisfecho/a en mi trabajo.',
      ],
      actividad_fisica: [
        'Hago actividad física regularmente, al menos tres veces por semana.',
        'Realizo actividad física esporádicamente, sin una rutina fija.',
        'No realizo ninguna actividad física en mi día a día.',
      ],
      patrones_sueno: [
        'Duermo menos de 5 horas por noche y me despierto con frecuencia.',
        'Mis patrones de sueño son irregulares, aunque duermo suficiente algunas noches.',
        'Tengo un patrón de sueño estable, con al menos 7 horas de descanso.',
      ],
      alimentacion: [
        'Llevo una dieta equilibrada y trato de mantener una alimentación saludable.',
        'Mi alimentación es irregular y suele incluir comidas rápidas y no saludables.',
        'No presto mucha atención a mi alimentación, y es bastante desordenada.',
      ],
      objetivos_terapia: [
        'Quiero trabajar en reducir mis niveles de ansiedad y mejorar mi bienestar.',
        'Mi objetivo es desarrollar habilidades para manejar el estrés diario.',
        'Busco explorar áreas de mi vida donde pueda mejorar mi autoestima.',
      ],
      cambios_deseados: [
        'Deseo ser más asertivo/a en mis relaciones personales y laborales.',
        'Quiero reducir mi ansiedad y aprender a manejar mis emociones.',
        'Me gustaría sentir más motivación y energía en mi vida cotidiana.',
      ],
      habilidades_deseadas: [
        'Quiero aprender a gestionar mejor mis emociones en situaciones de estrés.',
        'Me gustaría mejorar mi capacidad de comunicación con los demás.',
        'Deseo trabajar en fortalecer mi autoestima y confianza en mí mismo/a.',
      ],
      comentarios: [
        'Estoy dispuesto/a a trabajar en los cambios necesarios para mejorar.',
        'Agradezco el espacio para expresar mis inquietudes y recibir ayuda.',
        'Espero seguir avanzando en este proceso terapéutico de autoconocimiento.',
      ],
    };

    return (
      <View style={styles.quickResponsesContainer}>
        {responses[key] && responses[key].map((response, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickResponseButton}
            onPress={() => handleInputChange(key, response)}
          >
            <Text style={styles.quickResponseText}>{response}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderTextBox('Motivo de Consulta', 'motivo_consulta', 'Ingrese motivo de consulta', 'comment')}
        {renderTextBox('Tratamientos Previos', 'tratamiento_previo', 'Ingrese tratamientos previos', 'pill')}
        {renderTextBox('Medicamentos Actuales', 'medicamentos_actuales', 'Ingrese medicamentos actuales', 'pill')}
        {renderTextBox('Condiciones Médicas', 'condiciones_medicas', 'Ingrese condiciones médicas', 'heart')}
        {renderTextBox('Estado Emocional', 'estado_emocional', 'Ingrese estado emocional', 'emoticon-happy')}
        {renderTextBox('Síntomas Emocionales', 'sintomas_emocionales', 'Ingrese síntomas emocionales', 'emoticon-sad')}
        {renderPicker('Nivel de Estrés', 'nivel_estres', 'alert', ['Bajo', 'Moderado', 'Alto', 'Crítico'])}
        {renderTextBox('Relación Familiar', 'relacion_familiar', 'Ingrese relación familiar', 'account-group')}
        {renderTextBox('Red de Apoyo', 'red_apoyo', 'Ingrese red de apoyo', 'account-group')}
        {renderTextBox('Situación Laboral', 'situacion_laboral', 'Ingrese situación laboral', 'briefcase')}
        {renderTextBox('Actividad Física', 'actividad_fisica', 'Ingrese actividad física', 'run')}
        {renderTextBox('Patrones de Sueño', 'patrones_sueno', 'Ingrese patrones de sueño', 'bed')}
        {renderTextBox('Alimentación', 'alimentacion', 'Ingrese alimentación', 'food')}
        {renderTextBox('Objetivos de Terapia', 'objetivos_terapia', 'Ingrese objetivos de terapia', 'target')}
        {renderTextBox('Cambios Deseados', 'cambios_deseados', 'Ingrese cambios deseados', 'update')}
        {renderTextBox('Habilidades Deseadas', 'habilidades_deseadas', 'Ingrese habilidades deseadas', 'lightbulb')}
        {renderTextBox('Comentarios', 'comentarios', 'Ingrese comentarios', 'comment')}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F8', // Fondo más suave y claro
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#E4F5F6', // Color de fondo más claro que el principal para las tarjetas
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    elevation: 3,
  },
  cardTitle: {
    color: '#208F94', // Versión más oscura del color principal para títulos
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 10,
    color: '#24A8AF', // Color principal para los íconos
  },
  input: {
    backgroundColor: '#fff',
    color: '#333',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#208F94', // Color de borde coherente con los títulos
    flex: 1,
  },
  picker: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#208F94', // Borde acorde al esquema de colores
  },
  quickResponsesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  quickResponseButton: {
    backgroundColor: '#24A8AF', // Color principal para los botones de respuesta rápida
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 5,
  },
  quickResponseText: {
    color: '#fff',
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: '#208F94', 
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default NewReportScreen;

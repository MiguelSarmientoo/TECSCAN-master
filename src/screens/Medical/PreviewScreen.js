import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../../config/config'; // Asegúrate de que esta ruta sea correcta

const PreviewScreen = ({ route, navigation }) => {
    const { formData } = route.params;

    const handleSaveData = async () => {
        try {
            const response = await fetch(`${config.API_URL}/encuestas/crearencuesta`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cita_id: 1,
                    motivo_consulta: formData.motivo_consulta || null,
                    tratamiento_previo: formData.tratamiento_previo || null,
                    medicamentos_actuales: formData.medicamentos_actuales || null,
                    condiciones_medicas: formData.condiciones_medicas || null,
                    estado_emocional: formData.estado_emocional || null,
                    sintomas_emocionales: formData.sintomas_emocionales || null,
                    nivel_estres: formData.nivel_estres || null,
                    relacion_familiar: formData.relacion_familiar || null,
                    red_apoyo: formData.red_apoyo || null,
                    situacion_laboral: formData.situacion_laboral || null,
                    actividad_fisica: formData.actividad_fisica || null,
                    patrones_sueno: formData.patrones_sueno || null,
                    alimentacion: formData.alimentacion || null,
                    objetivos_terapia: formData.objetivos_terapia || null,
                    cambios_deseados: formData.cambios_deseados || null,
                    habilidades_deseadas: formData.habilidades_deseadas || null,
                    comentarios: formData.comentarios || null,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Error al guardar los datos en la encuesta');
            }
    
            // Ahora generamos el PDF después de guardar la encuesta
            const pdfResponse = await fetch(`${config.API_URL}/encuestas/generate-pdf/1`, {
                method: 'POST',
            });
    
            if (!pdfResponse.ok) {
                throw new Error('Error al generar el PDF');
            }
    
            // Si todo sale bien, mostramos una alerta y volvemos a la pantalla principal
            Alert.alert('Datos guardados y PDF generado correctamente', '', [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home', { paciente: route.params.paciente, formData }),
                },
            ]);
        } catch (error) {
            console.error('Error al guardar los datos o generar el PDF:', error);
            Alert.alert('Error', error.message);
        }
    };    

    const renderLabel = (key) => {
        const labels = {
            motivo_consulta: 'Motivo de Consulta',
            tratamiento_previo: 'Tratamiento Previo',
            medicamentos_actuales: 'Medicamentos Actuales',
            condiciones_medicas: 'Condiciones Médicas',
            estado_emocional: 'Estado Emocional',
            sintomas_emocionales: 'Síntomas Emocionales',
            nivel_estres: 'Nivel de Estrés',
            relacion_familiar: 'Relación Familiar',
            red_apoyo: 'Red de Apoyo',
            situacion_laboral: 'Situación Laboral',
            actividad_fisica: 'Actividad Física',
            patrones_sueno: 'Patrones de Sueño',
            alimentacion: 'Alimentación',
            objetivos_terapia: 'Objetivos de Terapia',
            cambios_deseados: 'Cambios Deseados',
            habilidades_deseadas: 'Habilidades Deseadas',
            comentarios: 'Comentarios',
        };
        return labels[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.subtitle}>Revise la información antes de guardar</Text>
                {Object.keys(formData).map((key, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text style={styles.label}>{renderLabel(key)}</Text>
                        <Text style={styles.value}>{formData[key]}</Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveData}>
                    <Text style={styles.buttonText}>Guardar Datos de Encuesta</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9F7F9', // Color de fondo claro
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    subtitle: {
        fontSize: 20,
        color: '#333',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    itemContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
    },
    label: {
        fontSize: 16,
        color: '#24A8AF', // Color principal
        marginBottom: 5,
    },
    value: {
        fontSize: 18,
        color: '#333',
    },
    saveButton: {
        borderColor: '#24A8AF', // Color del borde
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 15,
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'transparent', // Sin fondo para que se vea el borde
    },
    buttonText: {
        color: '#24A8AF', // Color del texto
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PreviewScreen;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import ScanScreen from '../screens/Main/ScanScreen';
import PacienteScreen from '../screens/Medical/PacientScreen';
import NewReportScreen from '../screens/Medical/NewReportScreen';
import ContactInfoScreen from '../screens/Medical/ContactInfoScreen';
import ReportsHistoryScreen from '../screens/Medical/ReportsHistoryScreen';
import PdfPreviewScreen from '../screens/Medical/PdfPreviewScreen';
import EventScreen from '../screens/Main/EventScreen';
import PreviewScreen from '../screens/Medical/PreviewScreen';
import ProfileScreen from '../screens/Main/ProfileScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen 
        name="ScanScreen" 
        component={ScanScreen} 
        options={{ 
          title: 'Escanear Código', // Nombre amigable
          headerShown: true,
          headerTitleAlign: 'center',
        }} 
      /> 
      <Stack.Screen 
        name="PacienteScreen" 
        component={PacienteScreen} 
        options={{ 
          title: 'Opciones del Paciente', // Nombre amigable
          headerShown: true,
          headerTitleAlign: 'center',
        }} 
      />
      <Stack.Screen 
        name="NewReportScreen" 
        component={NewReportScreen} 
        options={{ 
          title: 'Nuevo Reporte', // Nombre amigable
          headerShown: true,
          headerTitleAlign: 'center',
        }} 
      />
      <Stack.Screen 
        name="ContactInfo" 
        component={ContactInfoScreen} 
        options={{ 
          title: 'Información de Contacto', // Nombre amigable
          headerShown: false 
        }} 
      />
      <Stack.Screen 
        name="ReportsHistory" 
        component={ReportsHistoryScreen} 
        options={{ 
          title: 'Historial de Reportes', // Nombre amigable
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="PdfPreview" 
        component={PdfPreviewScreen} 
        options={{ 
          title: 'Vista Previa de PDF', // Nombre amigable
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="Events" 
        component={EventScreen} 
        options={{ 
          title: 'Eventos', // Nombre amigable
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="MedicalProfile" 
        component={ProfileScreen} 
        options={{ 
          title: 'Perfil Médico', // Nombre amigable
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="Preview" 
        component={PreviewScreen} 
        options={{ 
          title: 'Vista Previa', // Nombre amigable
          headerShown: true 
        }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

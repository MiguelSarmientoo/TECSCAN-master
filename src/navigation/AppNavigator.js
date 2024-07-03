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

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ScanScreen" component={ScanScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PacienteScreen" component={PacienteScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewReportScreen" component={NewReportScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ContactInfo" component={ContactInfoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ReportsHistory" component={ReportsHistoryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PdfPreview" component={PdfPreviewScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EventScreen" component={EventScreen}/>
      <Stack.Screen name="PreviewScreen" component={PreviewScreen}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;

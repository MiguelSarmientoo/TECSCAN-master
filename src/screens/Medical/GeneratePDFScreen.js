import { createStackNavigator } from '@react-navigation/stack';
import DiseaseTypeSelectionScreen from '../screens/DiseaseTypeSelectionScreen';
import DocumentFormScreen from '../screens/DocumentFormScreen';
import PreviewScreen from '../screens/PreviewScreen';
import GeneratePDFScreen from '../screens/GeneratePDFScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DiseaseTypeSelection" component={DiseaseTypeSelectionScreen} />
      <Stack.Screen name="DocumentForm" component={DocumentFormScreen} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
      <Stack.Screen name="GeneratePDF" component={GeneratePDFScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;

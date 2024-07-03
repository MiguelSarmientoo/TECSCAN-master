import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const PdfPreviewScreen = ({ route }) => {
  const { htmlContent, report } = route.params;
  const navigation = useNavigation();

  const printPDF = async () => {
    try {
      await Print.printAsync({ html: htmlContent });
    } catch (error) {
      Alert.alert('Error', `Could not print file: ${error.message}`);
    }
  };

  const savePDF = async () => {
    try {
      const pdf = await Print.printToFileAsync({ html: htmlContent });
      await saveReportFile(pdf.uri);
    } catch (error) {
      Alert.alert('Error', `Could not save file: ${error.message}`);
    }
  };

  const saveReportFile = async (uri) => {
    try {
      if (Platform.OS === 'android') {
        const fileUri = await FileSystem.copyAsync({ from: uri, to: `${FileSystem.documentDirectory}Report_${report.createdAt.replace(/\//g, '-')}.pdf` });
        Alert.alert('Success', 'File Saved');
      } else {
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      Alert.alert('Error', `Could not save file: ${error.message}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>PDF Preview</Text>
      </View>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }} // Asegúrate de que htmlContent sea el HTML completo
        style={styles.webview}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={printPDF}>
          <Text style={styles.buttonText}>Print PDF</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={savePDF}>
          <Text style={styles.buttonText}>Save PDF</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C3C',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    color: '#4C9EEB',
    fontSize: 18,
    marginRight: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  webview: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  actionButton: {
    backgroundColor: '#4C9EEB',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PdfPreviewScreen;

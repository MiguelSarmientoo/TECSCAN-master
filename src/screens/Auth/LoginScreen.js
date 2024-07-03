// src/screens/Auth/LoginScreen.js
import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../../contexts/UserContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setMedico } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://c342-190-232-119-12.ngrok-free.app/medicos/login', { email, password });
      if (response.data && response.data.medico) {
        setMedico(response.data.medico);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Error retrieving user data. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login. Please check your credentials and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://pbs.twimg.com/profile_images/1799816417518206976/myhOJIzF_400x400.jpg' }} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Icon name="account" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#888" style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholderTextColor="#888"
        />
        <Icon name="eye" size={20} color="#888" style={styles.icon} onPress={() => { /* Add show/hide password functionality */ }} />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Sign in</Text>
      </TouchableOpacity>
      <Text style={styles.orText}>Or continue with</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="google" size={30} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="apple" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Icon name="facebook" size={30} color="#3b5998" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#0A0E21',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#1C1C3C',
    borderRadius: 11,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  forgotPassword: {
    color: '#888',
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#0044cc',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  orText: {
    color: '#888',
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  socialButton: {
    padding: 10,
  },
});

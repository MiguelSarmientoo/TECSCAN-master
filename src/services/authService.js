import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../utils/constants';

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const getCurrentUser = async () => {
  try {
    // Obtener el usuario actual desde AsyncStorage
    const user = await AsyncStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error al obtener el usuario actual:', error);
    throw error;
  }
};

const logout = async () => {
  try {
    // Borrar el usuario actual de AsyncStorage al cerrar sesión
    await AsyncStorage.removeItem('currentUser');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};

export default {
  login,
  getCurrentUser,
  logout
};

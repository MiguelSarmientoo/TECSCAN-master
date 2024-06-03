import axios from 'axios';
import { API_URL } from '../utils/constants';

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

const getCurrentUser = async () => {
  // Lógica para obtener el usuario actual, probablemente usando AsyncStorage
};

const logout = () => {
  // Lógica para cerrar sesión
};

export default {
  login,
  getCurrentUser,
  logout
};

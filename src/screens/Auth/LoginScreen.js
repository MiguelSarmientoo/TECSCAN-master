import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Animated, Keyboard, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../../contexts/UserContext';
import LottieView from 'lottie-react-native';
import config from '../../config/config';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [keyboardVisible, setKeyboardVisible] = useState(false); // Nuevo estado para controlar la visibilidad de las animaciones
  const { setMedico } = useContext(UserContext);
  const { width, height } = Dimensions.get('window');

  // Efecto para escuchar los eventos del teclado
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Limpiar los listeners cuando el componente se desmonte
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!email || !password) {
      showErrorMessage('Please enter your email and password.');
      return;
    }

    try {
      const response = await axios.post(`${config.API_URL}/medicos/login`, { email, password });
      if (response.data && response.data.medico) {
        setMedico(response.data.medico);
        navigation.navigate('Home');
      } else {
        showErrorMessage(response.data.message || 'An unexpected error occurred. Please try again later.');
      }
    } catch (error) {
      showErrorMessage('Error. Please, check the email and password and try again.');
    }
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setErrorMessage(''));
      }, 4000);
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.mainContainer}>
        {/* Animaciones que desaparecen cuando el teclado está visible */}
        {!keyboardVisible && (
          <>
            <LottieView
              source={require('../../../assets/upper.json')}
              autoPlay
              loop
              style={styles.upperAnimation}
            />
            <LottieView
              source={require('../../../assets/down.json')}
              autoPlay
              loop
              style={styles.lowerAnimation}
            />
          </>
        )}

        {/* Contenido principal */}
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={styles.logoContainer}>
              <LottieView
                source={require('../../../assets/logoo.json')}
                autoPlay
                loop
                style={styles.logo}
              />
            </View>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Please sign in to your account</Text>

            <View style={styles.inputGroup}>
              <View style={styles.inputContainer}>
                <Icon name="email-outline" size={22} color="#21cecc" style={styles.icon} />
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#b1becc"
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon name="lock-outline" size={22} color="#21cecc" style={styles.icon} />
                <TextInput
                  placeholder="Password"
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#b1becc"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#21cecc"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Sign In</Text>
            </TouchableOpacity>

            {errorMessage ? (
              <Animated.View style={[styles.errorContainer, { opacity: fadeAnim }]}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </Animated.View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperAnimation: {
    position: 'absolute',
    top: 0,
    left: -90,
    width: 700,
    height: 280,
    zIndex: -1, // Colocado detrás del contenido
  },
  lowerAnimation: {
    position: 'absolute',
    bottom: 0,
    left: -220,
    right: 100,
    width: 700,
    height: 250,
    zIndex: -1, // Colocado detrás del contenido
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    width: '100%',
    paddingBottom: 90,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 0,
    marginTop: 30,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#061527',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#576271',
    marginBottom: 24,
  },
  inputGroup: {
    width: '110%',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E8EB',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 15,
    elevation: 2,
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: '#061527',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#24A8AF',
    paddingVertical: 17,
    borderRadius: 10,
    width: '110%',
    alignItems: 'center',
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  errorContainer: {
    position: 'absolute', 
    bottom: 100, 
    backgroundColor: '#FF6B6B',
    padding: 14,
    borderRadius: 8,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

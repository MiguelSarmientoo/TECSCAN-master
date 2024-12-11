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
  const [loading, setLoading] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const { setMedico } = useContext(UserContext);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      showErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const showErrorMessage = (message) => {
    setErrorMessage(message);
    setNotificationVisible(true);
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
        setNotificationVisible(false);
      }, 4000);
    });
  };

  const isFormValid = email && password;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.mainContainer}>
        <LottieView
          source={require('../../../assets/upper.json')}
          autoPlay
          loop
          style={styles.upperAnimation}
        />

        {!keyboardVisible && (
          <LottieView
            source={require('../../../assets/down.json')}
            autoPlay
            loop
            style={styles.lowerAnimation}
          />
        )}

        {notificationVisible && (
          <Animated.View style={[styles.notification, { opacity: fadeAnim }]}>
            <Icon name="alert-circle" size={22} color="#fff" style={styles.notificationIcon} />
            <Text style={styles.notificationText}>{errorMessage}</Text>
          </Animated.View>
        )}

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

            <TouchableOpacity
              style={[styles.loginButton, { opacity: isFormValid ? 1 : 0.6 }]}
              onPress={handleLogin}
              disabled={!isFormValid}
            >
              {loading ? (
                <Icon name="loading" size={24} color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
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
    zIndex: -1,
  },
  lowerAnimation: {
    position: 'absolute',
    bottom: 0,
    left: -220,
    right: 100,
    width: 700,
    height: 250,
    zIndex: -1,
  },
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 71, 71, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#F1F1F1',
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 70,
  },
  notificationIcon: {
    marginRight: 10,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
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
    paddingTop: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: -20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2D2D2D',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 24,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 2,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#2D2D2D',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#21cecc',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  loginButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (email === 'bagus@gmail.com' && password === 'bagusganteng') {
        Alert.alert('Login Berhasil', 'Selamat datang!');
        // Navigasi ke layar lain bisa ditambahkan di sini
        // Misalnya, 
        navigation.navigate('MainTabs');
      } else {
        Alert.alert('Login Gagal', 'Email atau kata sandi salah');
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Monitoring Pantai Selatan</Text>
          <Text style={styles.subtitle}>Pesisir Jawa Tengah</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Icon name="email-outline" size={20} color="#374151" />
              <Text style={styles.label}>Email</Text>
            </View>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder="Masukkan email Anda"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Icon name="lock-outline" size={20} color="#374151" />
              <Text style={styles.label}>Kata Sandi</Text>
            </View>
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                style={[styles.input, styles.passwordInput]}
                placeholder="Masukkan kata sandi"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#6B7280"
                />
              </Pressable>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="white" />
                <Text style={styles.buttonText}>Memproses...</Text>
              </View>
            ) : (
              <Text style={styles.buttonText}>MASUK</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4FD1C5', // teal-400
    padding: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D9488', // teal-600
    textAlign: 'center',
  },
  subtitle: {
    color: '#6B7280', // gray-500
    marginTop: 8,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151', // gray-700
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: '#E5E7EB', // gray-200
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937', // gray-800
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{translateY: -12}],
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    color: '#0D9488', // teal-600
    fontWeight: '500',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#0D9488', // teal-600
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default Login;

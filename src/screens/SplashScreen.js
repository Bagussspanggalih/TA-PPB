import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Animated sequence for entrance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to main screen after delay
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/ombak.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>CM</Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.mainTitle}>Enterverse wave</Text>
            <Text style={styles.subTitle}>JAWA TENGAH</Text>
            <View style={styles.separator} />
            <Text style={styles.description}>Sistem Monitoring Pesisir</Text>
            <Text style={styles.region}>Pantai Selatan</Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Teknik Komputer bgs</Text>
            <Text style={styles.footerSubText}>PROVINSI JAWA TENGAH</Text>
          </View>
        </Animated.View>

        <View style={styles.wavyPattern} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#051C2C',
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(5, 28, 44, 0.85)', 
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 30,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  textContainer: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 42,
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subTitle: {
    fontSize: 24,
    color: '#4AA3FF',
    fontWeight: '600',
    letterSpacing: 4,
    marginBottom: 20,
  },
  separator: {
    width: 40,
    height: 3,
    backgroundColor: '#4AA3FF',
    borderRadius: 2,
    marginVertical: 20,
  },
  description: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
    opacity: 0.9,
  },
  region: {
    fontSize: 20,
    color: '#4AA3FF',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 1,
    opacity: 0.8,
  },
  footerSubText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 2,
    marginTop: 4,
    opacity: 0.6,
  },
  wavyPattern: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'transparent',
    borderTopWidth: 2,
    borderColor: 'rgba(74, 163, 255, 0.3)',
    borderStyle: 'dashed',
  },
});

export default SplashScreen;
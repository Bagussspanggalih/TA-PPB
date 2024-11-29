// components/Profile.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation }) => {
  const appInfo = {
    name: "Monitoring Pesisir Pantai Selatan Jawa Tengah",
    version: "1.0.0",
    description: "Aplikasi untuk pemantauan kondisi pesisir pantai Selatan Jawa Tengah guna mendukung mitigasi bencana dan pelestarian lingkungan.",
    features: [
      "Pemantauan kualitas air dan cuaca",
      "Peta lokasi pantai",
      "Laporan kondisi terkini",
      "Peringatan dini bencana",
      "Analisis data lingkungan",
    ],
    contact: {
      email: "support@monitoringpesisir.com",
      phone: "(021) 9876-5432",
      address: "Jl. Pantai No. 321, Jawa Tengah",
    },
    social: {
      facebook: "MonitoringPesisir",
      instagram: "@monitoringpesisir",
      twitter: "@monitoringJawaTengah",
    }
  };

  const handleSocialPress = (platform) => {
    let url;
    switch (platform) {
      case 'facebook':
        url = `https://facebook.com/${appInfo.social.facebook}`;
        break;
      case 'instagram':
        url = `https://instagram.com/${appInfo.social.instagram}`;
        break;
      case 'twitter':
        url = `https://twitter.com/${appInfo.social.twitter}`;
        break;
    }
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://example.com/your-logo-url.png' }}
            style={styles.logo}
          />
          <Text style={styles.appName}>{appInfo.name}</Text>
          <Text style={styles.version}>Version {appInfo.version}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
          <Text style={styles.description}>{appInfo.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitur Utama</Text>
          {appInfo.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon name="checkmark-circle" size={24} color="#0066CC" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hubungi Kami</Text>
          <View style={styles.contactItem}>
            <Icon name="mail-outline" size={24} color="#333" />
            <Text style={styles.contactText}>{appInfo.contact.email}</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="call-outline" size={24} color="#333" />
            <Text style={styles.contactText}>{appInfo.contact.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="location-outline" size={24} color="#333" />
            <Text style={styles.contactText}>{appInfo.contact.address}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ikuti Kami</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: '#1877F2' }]}
              onPress={() => handleSocialPress('facebook')}
            >
              <Icon name="logo-facebook" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: '#E4405F' }]}
              onPress={() => handleSocialPress('instagram')}
            >
              <Icon name="logo-instagram" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.socialButton, { backgroundColor: '#1DA1F2' }]}
              onPress={() => handleSocialPress('twitter')}
            >
              <Icon name="logo-twitter" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 90
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default Profile;

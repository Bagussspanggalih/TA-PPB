import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  StatusBar, 
  Dimensions, 
  Platform, 
  ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatBotModal from '../components/ChatBotModal';

const { width } = Dimensions.get('window');

const ChatBot = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [featureDescription, setFeatureDescription] = useState('');

  const FeatureDescriptionModal = ({ visible, description, onClose }) => (
    <View style={[styles.modalContainer, visible ? styles.modalVisible : styles.modalHidden]}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Deskripsi Fitur</Text>
        <Text style={styles.modalText}>{description}</Text>
        <TouchableOpacity onPress={onClose} style={styles.modalButton}>
          <Text style={styles.modalButtonText}>Tutup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const Header = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Pantau Pesisir</Text>
      <Text style={styles.headerSubtitle}>Sistem Pelaporan Terpadu</Text>
    </View>
  );

  const StatusBadge = () => (
    <View style={styles.statusBadge}>
      <Icon name="bar-chart-outline" size={20} color="#FFFFFF" />
      <Text style={styles.statusText}>Monitoring & Pelaporan</Text>
    </View>
  );

  const StatsSection = () => (
    <View style={styles.statsContainer}>
      {[
        { number: '24', label: 'Titik Pantau' },
        { number: '15', label: 'Tim Lapangan' },
        { number: '98%', label: 'Respon Rate' }
      ].map((stat, index) => (
        <View 
          key={stat.label} 
          style={[styles.statItem, index === 1 ? styles.statBorder : {}]}
        >
          <Text style={styles.statNumber}>{stat.number}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );

  const FeaturesSection = () => (
    <View style={styles.featuresContainer}>
      {[
        { icon: 'stats-chart-outline', text: 'Monitoring', subText: 'Real-time' },
        { icon: 'alert-outline', text: 'Pelaporan', subText: '24/7' },
        { icon: 'information-circle-outline', text: 'Informasi', subText: 'Update' }
      ].map(feature => (
        <View key={feature.text} style={styles.featureItem}>
          <View style={styles.featureIconBg}>
            <Icon name={feature.icon} size={24} color="#1C4670" />
          </View>
          <Text style={styles.featureText}>{feature.text}</Text>
          <Text style={styles.featureSubText}>{feature.subText}</Text>
        </View>
      ))}
    </View>
  );

  const ActionButtons = () => (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.monitorButton}
        onPress={() => setShowChatBot(true)}
        activeOpacity={0.8}
      >
        <Icon name="chatbubble-outline" size={24} color="#FFFFFF" />
        <Text style={styles.buttonText}>Mulai Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => {/* Handle report */}}
        activeOpacity={0.8}
      >
        <Icon name="alert-circle-outline" size={24} color="#1C4670" />
        <Text style={styles.reportButtonText}>Buat Laporan</Text>
      </TouchableOpacity>
    </View>
  );

  const QuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.quickActionsTitle}>Mitigasi & Evakuasi Bencana:</Text>
      <View style={styles.quickActionsGrid}>
        {[
          { icon: 'warning-outline', text: 'Potensi Tsunami', description: 'Pesisir Jawa Tengah berpotensi terpapar tsunami akibat aktivitas seismik di Samudra Hindia, yang memiliki zona subduksi aktif. Gempa bumi bawah laut dapat memicu gelombang tsunami yang merusak infrastruktur dan membahayakan keselamatan di daerah pesisir seperti Cilacap, Kebumen, dan Purworejo. Oleh karena itu, penting untuk memiliki sistem peringatan dini dan edukasi mitigasi bencana.' },
          { icon: 'navigate-circle-outline', text: 'Rute Evakuasi', description: 'Rute evakuasi tsunami di pesisir Jawa Tengah harus mengarah ke daerah yang lebih tinggi, lebih dari 3 km dari pantai, dan di ketinggian minimal 20 meter. Evakuasi dilakukan melalui jalur darat yang aman, menghindari area yang berisiko banjir. Penting untuk mengikuti petunjuk rambu evakuasi dan memastikan sistem peringatan dini berfungsi dengan baik.' },
          { icon: 'umbrella-outline', text: 'Peringatan Cuaca', description: 'Peringatan cuaca pesisir di Jawa Tengah, khususnya di pesisir Samudra Hindia, meliputi gelombang tinggi, angin kencang, dan badai tropis. BMKG mengimbau masyarakat untuk waspada dan menghindari aktivitas di laut atau pantai saat cuaca buruk.' },
          { icon: 'people-outline', text: 'Tim Evakuasi', description: 'Tim yang siap melakukan evakuasi: BPBD, TNI dan Polri, SAR, Relawan, Pemerintah Daerah.' }
        ].map(action => (
          <TouchableOpacity 
            key={action.text} 
            style={styles.quickActionItem}
            onPress={() => {
              setFeatureDescription(action.description);
              setShowDescriptionModal(true);
            }}
          >
            <Icon name={action.icon} size={24} color="#1C4670" />
            <Text style={styles.quickActionText}>{action.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );  

  const ContactInfo = () => (
    <View style={styles.contactContainer}>
      <Text style={styles.contactTitle}>Kontak Darurat:</Text>
      <View style={styles.contactWrapper}>
        {[
          { icon: 'call-outline', text: '0271-123456' },
          { icon: 'mail-outline', text: 'pantau@jateng.go.id' }
        ].map(contact => (
          <TouchableOpacity key={contact.text} style={styles.contactItem}>
            <View style={styles.contactIconBg}>
              <Icon name={contact.icon} size={20} color="#1C4670" />
            </View>
            <Text style={styles.contactText}>{contact.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor="#1C4670" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <StatusBadge />
            <Image
              source={require('../../assets/ombak logo.png')}
              style={styles.monitorImage}
              resizeMode="contain"
            />
            <StatsSection />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Monitor & Laporkan</Text>
              <Text style={styles.description}>
                Sistem pemantauan dan pelaporan kondisi pesisir pantai secara real-time. 
                Laporkan perubahan atau potensi bahaya yang Anda temukan di wilayah pantai.
              </Text>
            </View>
            <FeaturesSection />
            <ActionButtons />
            <QuickActions />
            <ContactInfo />
          </View>
        </ScrollView>

        <ChatBotModal visible={showChatBot} onClose={() => setShowChatBot(false)} />

        <FeatureDescriptionModal 
          visible={showDescriptionModal} 
          description={featureDescription} 
          onClose={() => setShowDescriptionModal(false)} 
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Latar belakang lebih terang
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: Platform.OS === 'ios' ? 0 : -45,
  },
  headerContainer: {
    backgroundColor: '#1C4670',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#D1D1D1',
  },
  content: {
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  statusBadge: {
    backgroundColor: '#1C4670',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginBottom: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  monitorImage: {
    width: width - 30,
    height: 200,
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1C4670',
  },
  statLabel: {
    color: '#D1D1D1',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderLeftColor: '#D1D1D1',
  },
  textContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C4670',
  },
  description: {
    fontSize: 14,
    color: '#7C7C7C',
    marginTop: 10,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIconBg: {
    backgroundColor: '#E3F1FF',
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#1C4670',
  },
  featureSubText: {
    fontSize: 12,
    color: '#7C7C7C',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monitorButton: {
    backgroundColor: '#1C4670',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
    flex: 1,
  },
  reportButton: {
    backgroundColor: '#D1D1D1',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 30,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 10,
  },
  reportButtonText: {
    color: '#1C4670',
    marginLeft: 10,
  },
  quickActionsContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C4670',
    marginBottom: 10,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    backgroundColor: '#E3F1FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 14,
    color: '#1C4670',
    marginTop: 5,
  },
  contactContainer: {
    marginTop: 20,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C4670',
  },
  contactWrapper: {
    marginTop: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactIconBg: {
    backgroundColor: '#E3F1FF',
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  contactText: {
    fontSize: 14,
    color: '#1C4670',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 350,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C4670',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  modalButton: {
    marginTop: 20,
    backgroundColor: '#1C4670',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalVisible: {
    display: 'flex',
  },
  modalHidden: {
    display: 'none',
  },
});

export default ChatBot;

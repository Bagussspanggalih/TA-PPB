import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Keyboard,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const DisasterReportModal = ({ visible, onClose }) => {
  const [message, setMessage] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [initialScrollPosition, setInitialScrollPosition] = useState(0);
  const [chatHistory, setChatHistory] = useState([
    {
      id: '1',
      type: 'bot',
      message: 'Selamat datang di Layanan Pelaporan Bencana Pesisir Jawa Tengah. Untuk keadaan DARURAT, segera hubungi nomor darurat: 115 (BASARNAS) atau 129 (SAR). Silakan pilih jenis laporan atau ketik langsung situasi yang Anda amati.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [reportNumber, setReportNumber] = useState(2024000); // Format: Tahun + Nomor Urut
  const flatListRef = useRef(null);
  const scrollViewRef = useRef(null);

  const emergencyContacts = {
    BASARNAS: '115',
    SAR: '129',
    BMKG: '196',
    'Posko Pantai Parangtritis': '(0274) 123456',
    'Posko Pantai Pangandaran': '(0265) 123456',
  };

  useEffect(() => {
    if (visible) {
      setInitialScrollPosition(0);
    }
  }, [visible]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardStatus(true);
        flatListRef.current?.scrollToEnd({ animated: true });
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardStatus(false);
        flatListRef.current?.scrollToOffset({ 
          offset: initialScrollPosition,
          animated: true 
        });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [initialScrollPosition]);

  const disasterCategories = [
    "🌊 Gelombang Tinggi",
    "🌪 Angin Kencang",
    "🏊‍♂️ Korban Terseret Ombak",
    "⚠️ Kerusakan Infrastruktur",
    "📍 Lokasi Pengungsian",
    "ℹ️ Info Cuaca"
  ];

  const checkEmergencyKeywords = (text) => {
    const emergencyWords = ['darurat', 'korban', 'terseret', 'tenggelam', 'tolong', 'selamatkan', 'sos'];
    return emergencyWords.some(word => text.toLowerCase().includes(word));
  };

  const handleSend = (text = message) => {
    if (text.trim() === '') return;

    // Check for emergency keywords and show alert
    if (checkEmergencyKeywords(text)) {
      Alert.alert(
        'PERINGATAN DARURAT!',
        'Untuk keadaan darurat, segera hubungi:\n\n' +
        'BASARNAS: 115\n' +
        'SAR: 129\n\n' +
        'Lanjutkan melaporkan situasi di sini setelah menghubungi nomor darurat.',
        [{ text: 'Mengerti', style: 'cancel' }]
      );
    }

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: text.trim()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    const newReportNumber = reportNumber + 1;
    setReportNumber(newReportNumber);

    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: getBotResponse(text.trim(), newReportNumber)
      };
      setChatHistory(prev => [...prev, botResponse]);
      setIsLoading(false);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1000);
  };

  const getBotResponse = (userMessage, reportNum) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Handle weather info request
    if (lowerMessage.includes('cuaca') || lowerMessage.includes('info')) {
      return `🌊 Info Cuaca Terkini (Update otomatis dari BMKG):\n\n` +
             `- Tinggi Gelombang: 2.5 - 4.0 meter\n` +
             `- Kecepatan Angin: 20-25 knot\n` +
             `- Status: WASPADA\n` +
             `- Area: Perairan Cilacap - Parangtritis\n\n` +
             `Diperbarui: ${new Date().toLocaleString()}\n` +
             `Sumber: BMKG`;
    }

    // Handle evacuation info
    if (lowerMessage.includes('pengungsian') || lowerMessage.includes('lokasi aman')) {
      return `📍 Lokasi Pengungsian Terdekat:\n\n` +
             `1. Gedung BPBD Cilacap\n   Kapasitas: 200 orang\n   Status: Tersedia\n\n` +
             `2. Balai Desa Parangtritis\n   Kapasitas: 150 orang\n   Status: Tersedia\n\n` +
             `3. Sekolah SMP 1 Pangandaran\n   Kapasitas: 300 orang\n   Status: Tersedia\n\n` +
             `Hubungi 115 untuk bantuan evakuasi`;
    }

    // Handle high waves report
    if (lowerMessage.includes('gelombang') || lowerMessage.includes('ombak')) {
      return `⚠️ Laporan Gelombang Tinggi #${reportNum}\n\n` +
             `Waktu Laporan: ${new Date().toLocaleString()}\n` +
             `Lokasi: [Mohon sebutkan lokasi spesifik]\n\n` +
             `Tindakan yang diambil:\n` +
             `1. Laporan diteruskan ke BPBD\n` +
             `2. Tim pemantau disiagakan\n` +
             `3. Peringatan disebarkan ke wilayah sekitar\n\n` +
             `Mohon update situasi setiap 30 menit. ` +
             `Untuk cek status laporan, ketik "status #${reportNum}"`;
    }

    // Handle victims report
    if (lowerMessage.includes('korban') || lowerMessage.includes('terseret')) {
      return `🚨 LAPORAN DARURAT #${reportNum}\n\n` +
             `SEGERA HUBUNGI:\n` +
             `- BASARNAS: 115\n` +
             `- SAR: 129\n\n` +
             `Detail yang diperlukan:\n` +
             `- Jumlah korban\n` +
             `- Lokasi terakhir terlihat\n` +
             `- Ciri-ciri korban\n` +
             `- Waktu kejadian\n\n` +
             `Status: Tim SAR dikerahkan\n` +
             `Prioritas: URGENT`;
    }

    // Handle status check
    if (lowerMessage.includes('status #')) {
      return `📊 Status Laporan #${lowerMessage.split('#')[1]}\n\n` +
             `- Laporan diterima\n` +
             `- Tim pemantau telah dikerahkan\n` +
             `- Koordinasi dengan BPBD sedang berlangsung\n` +
             `- Update terakhir: ${new Date().toLocaleString()}\n\n` +
             `Untuk informasi lebih lanjut, hubungi posko terdekat.`;
    }

    // Default response
    return `📝 Laporan #${reportNum} diterima.\n\n` +
           `Mohon sertakan informasi berikut:\n` +
           `1. Lokasi spesifik\n` +
           `2. Kondisi terkini\n` +
           `3. Jumlah orang terdampak (jika ada)\n` +
           `4. Kerusakan yang terlihat\n\n` +
           `Nomor Darurat:\n` +
           `- BASARNAS: 115\n` +
           `- SAR: 129\n` +
           `- BMKG: 196`;
  };

  const renderChatItem = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.type === 'user' ? styles.userMessage : styles.botMessage
    ]}>
      <Text style={[
        styles.messageText,
        item.type === 'user' ? styles.userMessageText : styles.botMessageText
      ]}>{item.message}</Text>
    </View>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Laporan Bencana Pesisir</Text>
            <View style={styles.emergencyContainer}>
              <View style={styles.emergencyDot} />
              <Text style={styles.emergencyText}>Darurat: 115 (BASARNAS)</Text>
            </View>
          </View>
          <View style={styles.headerRight} />
        </View>

        <View style={styles.suggestedContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestedContent}
          >
            {disasterCategories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestedItem}
                onPress={() => handleSend(category)}
              >
                <Text style={styles.suggestedText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0}
          style={{ flex: 1 }}
        >
          <FlatList
            ref={flatListRef}
            data={chatHistory}
            renderItem={renderChatItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.chatContainer}
            onContentSizeChange={() => {
              if (keyboardStatus) {
                flatListRef.current?.scrollToEnd({ animated: true });
              }
            }}
            onScroll={(event) => {
              if (!keyboardStatus) {
                setInitialScrollPosition(event.nativeEvent.contentOffset.y);
              }
            }}
            scrollEventThrottle={16}
          />

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#D32F2F" />
            </View>
          )}

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ketik laporan situasi..."
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity 
              style={[styles.sendButton, message.trim() ? styles.sendButtonActive : {}]}
              onPress={() => handleSend()}
              disabled={!message.trim()}
            >
              <Icon 
                name="send" 
                size={24} 
                color={message.trim() ? "#FFFFFF" : "#A0A0A0"} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#D32F2F',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  closeButton: {
    padding: 8,
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emergencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  emergencyDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D32F2F',
    marginRight: 4,
  },
  emergencyText: {
    fontSize: 12,
    color: '#D32F2F',
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  suggestedContainer: {
    padding: 12,
    backgroundColor: '#FFEBEE',
  },
  suggestedContent: {
    paddingHorizontal: 4,
  },
  suggestedItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#D32F2F',
  },
  suggestedText: {
      fontSize: 14,
      color: '#D32F2F',
      fontWeight: '500'
    },
    chatContainer: {
      padding: 16,
      paddingBottom: 24
    },
    messageContainer: {
      maxWidth: '80%',
      marginVertical: 8,
      padding: 12,
      borderRadius: 16,
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#D32F2F',
      borderTopRightRadius: 4,
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#F5F5F5',
      borderTopLeftRadius: 4,
    },
    messageText: {
      fontSize: 15,
      lineHeight: 20,
    },
    userMessageText: {
      color: '#FFFFFF',
    },
    botMessageText: {
      color: '#000000',
    },
    loadingContainer: {
      position: 'absolute',
      bottom: 80,
      left: 0,
      right: 0,
      alignItems: 'center',
      paddingVertical: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
    input: {
      flex: 1,
      minHeight: 40,
      maxHeight: 100,
      backgroundColor: '#F5F5F5',
      borderRadius: 20,
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginRight: 8,
      fontSize: 16,
    },
    sendButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonActive: {
      backgroundColor: '#D32F2F',
    }
  });
  
  export default DisasterReportModal;
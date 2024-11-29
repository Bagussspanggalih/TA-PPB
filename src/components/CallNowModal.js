// components/CallNowModal.js
import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Linking
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CallNowModal = ({ visible, onClose, car }) => {
  const phoneNumbers = [
    { number: '+6289510327684', label: 'admin' },
    
  ];

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Call Dealer</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.carInfo}>
              <Text style={styles.carTitle}>{car?.brand} {car?.model}</Text>
              <Text style={styles.carSubtitle}>Select a number to call</Text>
            </View>

            {/* Phone Numbers List */}
            <View style={styles.phoneList}>
              {phoneNumbers.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.phoneItem}
                  onPress={() => handleCall(item.number)}
                >
                  <View style={styles.phoneItemLeft}>
                    <Icon name="phone" size={24} color="#1a73e8" />
                    <View style={styles.phoneItemText}>
                      <Text style={styles.phoneLabel}>{item.label}</Text>
                      <Text style={styles.phoneNumber}>{item.number}</Text>
                    </View>
                  </View>
                  <Icon name="chevron-right" size={24} color="#666" />
                </TouchableOpacity>
              ))}
            </View>

            {/* Note */}
            <Text style={styles.note}>
              Business hours: Monday - Saturday, 09:00 - 18:00
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 40,
  },
  content: {
    padding: 16,
  },
  carInfo: {
    marginBottom: 24,
  },
  carTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  carSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  phoneList: {
    marginBottom: 24,
  },
  phoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    marginBottom: 12,
  },
  phoneItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneItemText: {
    marginLeft: 16,
  },
  phoneLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666666',
  },
  note: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default CallNowModal;
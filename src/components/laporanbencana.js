// components/CarModal.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CallNowModal from './CallNowModal';

const { width } = Dimensions.get('window');

const CarModal = ({ visible, car, onClose }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [showCallModal, setShowCallModal] = useState(false);

  if (!car) return null;

  const formatPrice = (price) => {
    return `$ ${price.toLocaleString('en-US', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    })}`;
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Mobil</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image with Loading State */}
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: car.image }} 
              style={styles.image}
              resizeMode="cover"
              onLoadStart={() => setImageLoading(true)}
              onLoadEnd={() => setImageLoading(false)}
            />
            {imageLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#1a73e8" />
              </View>
            )}
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.basicInfo}>
              <View>
                <Text style={styles.brand}>{car.brand}</Text>
                <Text style={styles.model}>{car.model} ({car.year})</Text>
              </View>
              <Text style={styles.price}>{formatPrice(car.price)}</Text>
            </View>

            {/* Specifications */}
            <View style={styles.specSection}>
              <Text style={styles.sectionTitle}>Specifications</Text>
              <View style={styles.specGrid}>
                <View style={styles.specItem}>
                  <Icon name="settings" size={24} color="#1a73e8" />
                  <Text style={styles.specLabel}>Transmission</Text>
                  <Text style={styles.specValue}>{car.transmission}</Text>
                </View>
                <View style={styles.specItem}>
                  <Icon name="local-gas-station" size={24} color="#1a73e8" />
                  <Text style={styles.specLabel}>Fuel Type</Text>
                  <Text style={styles.specValue}>{car.fuelType}</Text>
                </View>
                <View style={styles.specItem}>
                  <Icon name="event-seat" size={24} color="#1a73e8" />
                  <Text style={styles.specLabel}>Seats</Text>
                  <Text style={styles.specValue}>{car.seatingCapacity}</Text>
                </View>
                <View style={styles.specItem}>
                  <Icon name="speed" size={24} color="#1a73e8" />
                  <Text style={styles.specLabel}>Mileage</Text>
                  <Text style={styles.specValue}>12,000 km</Text>
                </View>
              </View>
            </View>

            {/* Description */}
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                This {car.brand} {car.model} comes with premium features and excellent condition.
                It has been well maintained and regularly serviced at authorized centers.
                Perfect for family use with its spacious interior and comfortable seating.
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Action */}
        <View style={styles.bottomAction}>
          <TouchableOpacity style={styles.chatButton}>
            <Icon name="chat" size={20} color="#1a73e8" />
            <Text style={styles.chatButtonText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.callButton}
            onPress={() => setShowCallModal(true)}
          >
            <Text style={styles.callButtonText}>Call Now</Text>
          </TouchableOpacity>
        </View>

        {/* Call Now Modal */}
        <CallNowModal
          visible={showCallModal}
          onClose={() => setShowCallModal(false)}
          car={car}
        />
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
    paddingHorizontal: 16,
    height: 56,
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
  shareButton: {
    padding: 8,
  },
  imageContainer: {
    width: width,
    height: width * 0.75,
    backgroundColor: '#F6F8FA',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(246, 248, 250, 0.7)',
  },
  content: {
    padding: 16,
  },
  basicInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  brand: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  model: {
    fontSize: 16,
    color: '#666666',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  specSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  specItem: {
    width: '50%',
    padding: 8,
    marginBottom: 16,
  },
  specLabel: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  specValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginTop: 2,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
  },
  bottomAction: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#1a73e8',
    borderRadius: 8,
    marginRight: 12,
    flex: 1,
  },
  chatButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#1a73e8',
  },
  callButton: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#1a73e8',
    borderRadius: 8,
  },
  callButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default laporanbencana;
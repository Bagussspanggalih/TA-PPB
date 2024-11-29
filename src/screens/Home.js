import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ImageBackground,
  Dimensions,
  StatusBar,
  Animated,
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { getWavesOverview } from '../service/mapservice';

const { width, height } = Dimensions.get('window');

const WaveInfoItem = ({ label, value, isHighlighted }) => (
  <View style={[styles.infoItem, isHighlighted && styles.highlightedItem]}>
    <Text style={[styles.infoLabel, isHighlighted && styles.highlightedText]}>
      {label}
    </Text>
    <Text style={[styles.infoValue, isHighlighted && styles.highlightedValue]}>
      {value}
    </Text>
  </View>
);

const Home = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [waveData, setWaveData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWaveData = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setIsLoading(true);
      }

      const data = await getWavesOverview();
      
      // Transformasi data sesuai kebutuhan
      const transformedData = {
        [data.name]: {
          issued: data.issued,
          today: data.data[0]?.wave_desc || 'Tidak tersedia',
          tommorow: data.data[1]?.wave_desc || 'Tidak tersedia',
          h2: data.data[2]?.wave_desc || 'Tidak tersedia',
          h3: data.data[3]?.wave_desc || 'Tidak tersedia',
          windInfo: `${data.data[0]?.wind_from || 'N/A'} - ${data.data[0]?.wind_to || 'N/A'}`,
          windSpeed: `${data.data[0]?.wind_speed_min || 0} - ${data.data[0]?.wind_speed_max || 0} knot`
        }
      };

      setWaveData(transformedData);
    } catch (error) {
      console.error('Error fetching wave data:', error);
      Alert.alert(
        'Error',
        'Tidak dapat mengambil data gelombang. Silakan coba lagi.',
        [{ text: 'OK' }]
      );
    } finally {
      if (showRefresh) {
        setRefreshing(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // Fetch data when component mounts
    fetchWaveData();

    // Animate fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLocationPress = (location, data) => {
    setSelectedLocation(location);
    Alert.alert(
      location,
      `Detail Gelombang\n\n` +
      `Hari Ini: ${data.today}\n` +
      `Besok: ${data.tommorow}\n` +
      `Lusa: ${data.h2}\n` +
      `3 Hari Kedepan: ${data.h3}\n\n` +
      `Arah Angin: ${data.windInfo}\n` +
      `Kecepatan Angin: ${data.windSpeed}`,
      [
        {
          text: 'Tutup',
          onPress: () => setSelectedLocation(null),
          style: 'cancel',
        }
      ]
    );
  };

  const renderWaveItem = ({ item: [location, data] }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => handleLocationPress(location, data)}
    >
      <Animated.View 
        style={[
          styles.card,
          {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            }],
          },
          selectedLocation === location && styles.selectedCard
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.locationTitle}>{location}</Text>
          <Text style={styles.updateTime}>Diperbarui: {data.issued}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.waveInfo}>
          <WaveInfoItem label="Hari Ini" value={data.today} isHighlighted={true} />
          <WaveInfoItem label="Besok" value={data.tommorow} />
          <WaveInfoItem label="Lusa" value={data.h2} />
          <WaveInfoItem label="3 Hari Kedepan" value={data.h3} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <ImageBackground 
        source={require('../../assets/pantai.png')} 
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]} />
        <View style={styles.headerContainer}>
          <Text style={styles.mainTitle}>Monitoring Pesisir Pantai</Text>
          <Text style={styles.subTitle}>Jawa Tengah Bagian Selatan</Text>
        </View>
        <Animated.View 
          style={[
            styles.contentContainer, 
            { 
              opacity: fadeAnim,
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              }],
            }
          ]}
        >
          <FlatList
            data={Object.entries(waveData)}
            renderItem={renderWaveItem}
            keyExtractor={(item) => item[0]}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => fetchWaveData(true)}
                colors={['#3B82F6']}
                tintColor="#3B82F6"
              />
            }
          />
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  backgroundImageStyle: {
    opacity: 0.7,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  headerContainer: {
    paddingTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 16,
    color: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  updateTime: {
    fontSize: 12,
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  waveInfo: {
    padding: 15,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  highlightedItem: {
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
    padding: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  highlightedText: {
    color: '#1F2937',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  highlightedValue: {
    color: '#3B82F6',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  loadingText: {
    fontSize: 18,
    color: '#3B82F6',
    fontWeight: '600',
  }
});

export default Home;
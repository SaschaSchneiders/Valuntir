import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 6) / 3; // 3 Spalten mit 2px Gap

export default function LogoUploadScreen({ navigation }) {
  const [selectedAsset, setSelectedAsset] = useState(null); // Store the whole asset
  const [selectedImageUri, setSelectedImageUri] = useState(null); // For display
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Berechtigung erforderlich',
          'Bitte erlaube den Zugriff auf deine Fotos in den Einstellungen.',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
        return;
      }

      // Lade die letzten 100 Fotos
      const media = await MediaLibrary.getAssetsAsync({
        first: 100,
        mediaType: 'photo',
        sortBy: ['creationTime'],
      });

      setPhotos(media.assets);
      setLoading(false);
    } catch (error) {
      console.error('Error loading photos:', error);
      Alert.alert('Fehler', 'Fotos konnten nicht geladen werden');
      setLoading(false);
    }
  };


  const handleSave = () => {
    if (!selectedImageUri) {
      Alert.alert('Kein Bild ausgewählt', 'Bitte wähle ein Foto aus.');
      return;
    }
    
    // TODO: Backend API Call
    console.log('Profilbild speichern:', selectedImageUri);
    Alert.alert('Erfolgreich', 'Profilbild wurde gespeichert!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handleSelectPhoto = async (asset) => {
    try {
      // Get the full asset info to get a usable URI
      const assetInfo = await MediaLibrary.getAssetInfoAsync(asset.id);
      const uri = assetInfo.localUri || assetInfo.uri;
      
      setSelectedAsset(asset);
      setSelectedImageUri(uri);
    } catch (error) {
      console.error('Error getting asset info:', error);
      Alert.alert('Fehler', 'Bild konnte nicht geladen werden');
    }
  };

  const renderPhotoItem = ({ item }) => {
    const isSelected = selectedAsset?.id === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.photoItem,
          isSelected && styles.photoItemSelected
        ]}
        onPress={() => handleSelectPhoto(item)}
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: item.uri }} 
          style={styles.photoImage}
        />
        {isSelected && (
          <View style={styles.selectedOverlay}>
            <View style={styles.checkmarkCircle}>
              <Ionicons name="checkmark" size={20} color="#FFFFFF" />
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Abbrechen</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Profilbild</Text>
            <TouchableOpacity 
              style={styles.saveTextButton}
              onPress={handleSave}
              disabled={!selectedImageUri}
            >
              <Text style={[
                styles.saveTextButtonText,
                !selectedImageUri && styles.saveTextButtonDisabled
              ]}>
                Speichern
              </Text>
            </TouchableOpacity>
          </View>

          {/* Profile Image Preview - Oben */}
          <View style={styles.previewSection}>
            <View style={styles.imagePreviewContainer}>
              {selectedImageUri ? (
                <Image 
                  source={{ uri: selectedImageUri }} 
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.placeholderCircle}>
                  <Ionicons name="person" size={60} color="#CCCCCC" />
                </View>
              )}
            </View>
            <Text style={styles.helperText}>
              {selectedImageUri ? 'Wähle ein anderes Foto aus der Galerie' : 'Format 1:1 – Empfohlen: 500×500 Pixel'}
            </Text>
          </View>

          {/* Gallery Grid - Darunter */}
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000" />
              <Text style={styles.loadingText}>Lade Fotos...</Text>
            </View>
          ) : (
            <FlatList
              data={photos}
              renderItem={renderPhotoItem}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={styles.photoRow}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.galleryContent}
            />
          )}
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
  },
  cancelButton: {
    position: 'absolute',
    left: 16,
    padding: 4,
    zIndex: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  saveTextButton: {
    position: 'absolute',
    right: 16,
    padding: 4,
    zIndex: 10,
  },
  saveTextButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#007AFF',
  },
  saveTextButtonDisabled: {
    color: '#CCCCCC',
  },
  previewSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  imagePreviewContainer: {
    marginBottom: 12,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F5F5F5',
  },
  placeholderCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  helperText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  galleryContent: {
    paddingBottom: 20,
  },
  photoRow: {
    gap: 2,
  },
  photoItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    position: 'relative',
  },
  photoItemSelected: {
    opacity: 0.7,
  },
  photoImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F5F5F5',
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});


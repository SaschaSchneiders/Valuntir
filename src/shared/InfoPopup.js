import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InfoPopup({
  visible,
  title,
  value,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  saveButtonText = 'Speichern',
  onClose,
  onSave,
  onChangeText,
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1}
        onPress={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalAvoidingView}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[styles.modalInput, multiline && styles.modalInputMultiline]}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              autoFocus
              keyboardType={keyboardType}
              returnKeyType={multiline ? 'default' : 'done'}
              onSubmitEditing={multiline ? undefined : onSave}
              blurOnSubmit={false}
              multiline={multiline}
              numberOfLines={numberOfLines}
              textAlignVertical={multiline ? 'top' : 'center'}
            />

            <TouchableOpacity 
              style={styles.modalButtonSave}
              onPress={onSave}
            >
              <Text style={styles.modalButtonSaveText}>{saveButtonText}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingBottom: 280,
  },
  modalAvoidingView: {
    width: '100%',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  modalInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  modalInputMultiline: {
    minHeight: 120,
    paddingTop: 16,
  },
  modalButtonSave: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  modalButtonSaveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});


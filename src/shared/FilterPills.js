import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FilterPills({ tabs, selectedFilter, onFilterChange }) {
  return (
    <View style={styles.filterContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.filterTab,
            selectedFilter === tab.key && styles.filterTabActive
          ]}
          onPress={() => onFilterChange(tab.key)}
        >
          <Text
            style={[
              styles.filterTabText,
              selectedFilter === tab.key && styles.filterTabTextActive
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 6,
    gap: 6,
  },
  filterTab: {
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#999999',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
});




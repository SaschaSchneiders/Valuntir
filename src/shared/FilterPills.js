import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FilterPills({ tabs, selectedTab, onTabPress }) {
  return (
    <View style={styles.filterContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.filterTab,
            selectedTab === tab.key && styles.filterTabActive
          ]}
          onPress={() => onTabPress(tab.key)}
        >
          <Text
            style={[
              styles.filterTabText,
              selectedTab === tab.key && styles.filterTabTextActive
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
    marginBottom: 16,
    gap: 6,
  },
  filterTab: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
});


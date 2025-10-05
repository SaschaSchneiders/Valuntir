import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FloatingTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const getIconName = (routeName) => {
            switch (routeName) {
              case 'Home':
                return isFocused ? 'home' : 'home-outline';
              case 'Dashboard':
                return isFocused ? 'bar-chart' : 'bar-chart-outline';
              case 'Search':
                return isFocused ? 'search' : 'search-outline';
              case 'Connections':
                return isFocused ? 'people' : 'people-outline';
              case 'Profile':
                return isFocused ? 'person' : 'person-outline';
              case 'Settings':
                return isFocused ? 'settings' : 'settings-outline';
              default:
                return 'circle';
            }
          };
          
          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={[
                styles.tab, 
                isFocused && styles.activeTab
              ]}
            >
              <Ionicons
                name={getIconName(route.name)}
                size={24}
                color={isFocused ? '#000000' : '#666666'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#f5f5f5',
  },
});

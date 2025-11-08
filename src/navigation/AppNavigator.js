import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PublicProfileScreen from '../screens/PublicProfileScreen';
import ReminderScreen from '../screens/ReminderScreen';

// Components
import FloatingTabBar from '../components/FloatingTabBar';
import PackageBadge from '../components/PackageBadge';
import { useResponsive } from '../utils/responsive';

// Context
import { PackageProvider } from '../context/PackageContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const { isDesktop } = useResponsive();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: isDesktop ? { display: 'none' } : { display: 'none' }, // TabBar immer verstecken
      }}
      tabBar={(props) => !isDesktop ? <FloatingTabBar {...props} /> : null}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Statistiken',
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          tabBarLabel: 'Suche',
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Einstellungen',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <PackageProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="PublicProfile" component={PublicProfileScreen} />
          <Stack.Screen name="Reminders" component={ReminderScreen} />
      </Stack.Navigator>
        <PackageBadge />
    </NavigationContainer>
    </PackageProvider>
  );
}

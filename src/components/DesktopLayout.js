import React from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useResponsive } from '../utils/responsive';

export default function DesktopLayout({
  children,
  navigation,
  currentRoute,
  title,
  subtitle,
  showSearch = false,
}) {
  const { isDesktop } = useResponsive();

  // Auf Mobile/Tablet: normales Layout ohne Sidebar
  if (!isDesktop) {
    return children;
  }

  // Auf Desktop: Sidebar + TopBar + Content
  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <Sidebar navigation={navigation} currentRoute={currentRoute} />

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {/* Top Bar */}
        <TopBar
          title={title}
          subtitle={subtitle}
          showSearch={showSearch}
          navigation={navigation}
        />

        {/* Content Area (scrollable) */}
        <ScrollView
          style={styles.contentArea}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={true}
        >
          {children}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    ...(Platform.OS === 'web' && {
      height: '100vh',
      overflow: 'hidden',
    }),
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
    ...(Platform.OS === 'web' && {
      height: '100vh',
      overflow: 'hidden',
    }),
  },
  contentArea: {
    flex: 1,
    ...(Platform.OS === 'web' && {
      height: 'calc(100vh - 72px)', // TopBar Höhe abziehen
      overflowY: 'auto',
    }),
  },
  contentContainer: {
    padding: 32,
    paddingBottom: 80,
  },
});


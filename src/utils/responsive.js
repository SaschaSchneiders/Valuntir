import { useState, useEffect } from 'react';
import { Dimensions, Platform } from 'react-native';

// Breakpoints
export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  large: 1440,
};

// Hook für responsive Design
export const useResponsive = () => {
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);

  const isWeb = Platform.OS === 'web';
  const isMobile = dimensions.width < BREAKPOINTS.tablet;
  const isTablet = dimensions.width >= BREAKPOINTS.tablet && dimensions.width < BREAKPOINTS.desktop;
  const isDesktop = dimensions.width >= BREAKPOINTS.desktop;
  const isLargeDesktop = dimensions.width >= BREAKPOINTS.large;

  return {
    width: dimensions.width,
    height: dimensions.height,
    isWeb,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
  };
};

// Helper für responsive Werte
export const getResponsiveValue = (mobile, tablet, desktop) => {
  const { width } = Dimensions.get('window');
  
  if (width < BREAKPOINTS.tablet) return mobile;
  if (width < BREAKPOINTS.desktop) return tablet ?? desktop;
  return desktop;
};

// Helper für responsive Styles
export const responsiveStyles = {
  container: (isDesktop) => ({
    maxWidth: isDesktop ? 1200 : '100%',
    marginHorizontal: isDesktop ? 'auto' : 0,
    paddingHorizontal: isDesktop ? 40 : 20,
  }),
  
  grid: (columns, gap = 16) => ({
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: gap,
    marginHorizontal: -gap / 2,
  }),
  
  gridItem: (columns, gap = 16) => ({
    width: `${100 / columns}%`,
    paddingHorizontal: gap / 2,
  }),
};

// Hover-State Helper (nur Web)
export const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const hoverProps = Platform.OS === 'web' ? {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  } : {};

  return [isHovered, hoverProps];
};


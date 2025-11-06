import React, { createContext, useState, useContext } from 'react';

// Paket-Typen
export const PACKAGE_TYPES = {
  FREE: 'free',
  PRO: 'pro',
  BUSINESS: 'business',
};

// Context erstellen
const PackageContext = createContext();

// Provider Component
export function PackageProvider({ children }) {
  const [currentPackage, setCurrentPackage] = useState(PACKAGE_TYPES.BUSINESS); // Standard: BUSINESS für Demo

  const switchPackage = (packageType) => {
    if (Object.values(PACKAGE_TYPES).includes(packageType)) {
      setCurrentPackage(packageType);
    }
  };

  // Helper Functions für Feature-Checks
  const canViewUnlimitedProfiles = currentPackage !== PACKAGE_TYPES.FREE;
  const canSubmitRatings = currentPackage !== PACKAGE_TYPES.FREE;
  const canEarnFirstMoverRewards = currentPackage !== PACKAGE_TYPES.FREE;
  const isAdFree = currentPackage !== PACKAGE_TYPES.FREE;
  const canCustomizeProfile = currentPackage === PACKAGE_TYPES.BUSINESS;
  const canAccessStatistics = currentPackage === PACKAGE_TYPES.BUSINESS;
  const canReceiveLeads = currentPackage === PACKAGE_TYPES.BUSINESS;
  const canControlPublicVisibility = currentPackage === PACKAGE_TYPES.BUSINESS;

  const value = {
    currentPackage,
    switchPackage,
    // Feature Flags
    canViewUnlimitedProfiles,
    canSubmitRatings,
    canEarnFirstMoverRewards,
    isAdFree,
    canCustomizeProfile,
    canAccessStatistics,
    canReceiveLeads,
    canControlPublicVisibility,
    // Helper
    isFree: currentPackage === PACKAGE_TYPES.FREE,
    isPro: currentPackage === PACKAGE_TYPES.PRO,
    isBusiness: currentPackage === PACKAGE_TYPES.BUSINESS,
  };

  return (
    <PackageContext.Provider value={value}>
      {children}
    </PackageContext.Provider>
  );
}

// Hook zum Verwenden des Contexts
export function usePackage() {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error('usePackage must be used within a PackageProvider');
  }
  return context;
}


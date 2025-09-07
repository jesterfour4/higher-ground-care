"use client";

import React from "react";

interface PortalNavigationProps {
  activeSection: string;
  setActiveSection: (section: 'welcome' | 'kid-profile' | 'parent-profile' | 'videos' | 'lessons') => void;
  isKidMode: boolean;
}

export default function PortalNavigation({ 
  activeSection, 
  setActiveSection, 
  isKidMode 
}: PortalNavigationProps) {
  const navigationItems = [
    {
      key: 'welcome',
      label: 'Home',
      emoji: '🏠',
      description: 'Portal home'
    },
    {
      key: 'kid-profile',
      label: isKidMode ? 'My Profile' : 'Kid Profile',
      emoji: isKidMode ? '👦' : '🧒',
      description: isKidMode ? 'Tell us about yourself!' : 'Child information'
    },
    {
      key: 'parent-profile',
      label: 'Parent Info',
      emoji: '👨‍👩‍👧‍👦',
      description: 'Parent & caregiver details'
    },
    {
      key: 'videos',
      label: 'My Videos',
      emoji: '🎬',
      description: 'Session recordings'
    },
    {
      key: 'lessons',
      label: 'Mini Lessons',
      emoji: '🎓',
      description: 'Fun activities'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t-2 border-purple-200 shadow-lg z-40">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key as any)}
              className={`flex flex-col items-center py-3 px-4 rounded-2xl transition-all duration-300 ${
                activeSection === item.key
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <div className="text-2xl mb-1">{item.emoji}</div>
              <span className="text-xs font-medium text-center leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

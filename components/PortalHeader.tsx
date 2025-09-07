"use client";

import React from "react";
import { BRAND } from "../app/config";

interface PortalHeaderProps {
  user: any;
  isKidMode: boolean;
  setIsKidMode: (mode: boolean) => void;
  activeSection: string;
  setActiveSection: (section: 'welcome' | 'kid-profile' | 'parent-profile' | 'videos' | 'lessons') => void;
}

export default function PortalHeader({ 
  user, 
  isKidMode, 
  setIsKidMode, 
  activeSection, 
  setActiveSection 
}: PortalHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-purple-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                ✨
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {BRAND} Portal
                </h1>
                <p className="text-sm text-gray-600">
                  {isKidMode ? "Kid Mode" : "Parent Mode"}
                </p>
              </div>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setIsKidMode(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  !isKidMode 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                👨‍👩‍👧‍👦 Parent
              </button>
              <button
                onClick={() => setIsKidMode(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isKidMode 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                🧒 Kid
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
              <span className="text-sm text-gray-700 hidden sm:block">
                {user?.user_metadata?.full_name || user?.email}
              </span>
            </div>

            {/* Sign Out */}
            <form action="/auth/signout" method="post" className="inline">
              <button className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">
                Sign Out
              </button>
            </form>
          </div>
        </div>

        {/* Progress Indicator */}
        {activeSection !== 'welcome' && (
          <div className="mt-4">
            <div className="flex items-center justify-center space-x-2">
              {['kid-profile', 'parent-profile', 'videos', 'lessons'].map((section, index) => (
                <div key={section} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    activeSection === section 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-1 mx-2 ${
                      ['kid-profile', 'parent-profile', 'videos'].includes(activeSection) && 
                      index < ['kid-profile', 'parent-profile', 'videos', 'lessons'].indexOf(activeSection)
                        ? 'bg-purple-600' 
                        : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <p className="text-sm text-gray-600">
                {activeSection === 'kid-profile' && "Tell us about yourself!"}
                {activeSection === 'parent-profile' && "Parent information"}
                {activeSection === 'videos' && "Your video library"}
                {activeSection === 'lessons' && "Mini lessons & activities"}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

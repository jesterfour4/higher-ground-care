"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BRAND } from "../config";

export default function KidPortalPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Little Friend");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Get user name from localStorage if available
    const pictureUser = localStorage.getItem('current_picture_user');
    if (pictureUser) {
      const userData = JSON.parse(pictureUser);
      setUserName(userData.name || "Little Friend");
    }

    return () => clearInterval(timer);
  }, []);

  const handleStartAdventure = () => {
    // Set kid mode in the main portal
    localStorage.setItem('portal_kid_mode', 'true');
    router.push('/portal');
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Magical Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-green-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-orange-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/90 backdrop-blur-md border-b-2 border-purple-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                ✨
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {BRAND} Kid Portal
                </h1>
                <p className="text-sm text-gray-600">Your magical learning space!</p>
              </div>
            </div>
            <button
              onClick={handleBackToLogin}
              className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium"
            >
              Switch User
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl w-full text-center">
          {/* Welcome Message */}
          <div className="mb-12">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Welcome, {userName}!
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4">
              {getGreeting()}! Ready for your magical adventure?
            </p>
            <p className="text-lg text-gray-600">
              You did an amazing job with your picture code! 🌟
            </p>
          </div>

          {/* Portal Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4">🎥</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your Videos</h3>
              <p className="text-gray-600">Watch your therapy sessions and see how amazing you're doing!</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Mini Lessons</h3>
              <p className="text-gray-600">Fun activities and lessons from Laura to practice at home!</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Your Progress</h3>
              <p className="text-gray-600">Track your amazing progress and celebrate your wins!</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleStartAdventure}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce"
            >
              🚀 Start Your Adventure! 🚀
            </button>
            
            <div className="text-sm text-gray-600">
              <p>Click the button above to enter your magical portal!</p>
            </div>
          </div>

          {/* Fun Elements */}
          <div className="mt-12 text-6xl">
            <span className="animate-spin inline-block">🌟</span>
            <span className="animate-pulse inline-block mx-4">✨</span>
            <span className="animate-bounce inline-block">🎈</span>
            <span className="animate-pulse inline-block mx-4">🎪</span>
            <span className="animate-bounce inline-block">🎨</span>
          </div>

          {/* Time Display */}
          <div className="mt-8 text-gray-600">
            <p className="text-lg">
              Today is {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <p className="text-sm">
              {currentTime.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
              })}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

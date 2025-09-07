"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { BRAND } from "../config";
import PortalHeader from "@/components/PortalHeader";
import KidProfile from "@/components/KidProfile";
import ParentProfile from "@/components/ParentProfile";
import VideoGallery from "@/components/VideoGallery";
import MiniLessons from "@/components/MiniLessons";
import PortalNavigation from "@/components/PortalNavigation";

export default function PortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'welcome' | 'kid-profile' | 'parent-profile' | 'videos' | 'lessons'>('welcome');
  const [isKidMode, setIsKidMode] = useState(false);

  useEffect(() => {
    checkUser();
    // Check if coming from kid portal
    const kidMode = localStorage.getItem('portal_kid_mode');
    if (kidMode === 'true') {
      setIsKidMode(true);
      localStorage.removeItem('portal_kid_mode'); // Clear the flag
    }
  }, []);

  const checkUser = async () => {
    try {
      // Check if this is a picture user first
      const pictureUser = localStorage.getItem('current_picture_user');
      if (pictureUser) {
        const userData = JSON.parse(pictureUser);
        setUser({
          id: userData.userId,
          email: 'picture-user@example.com',
          user_metadata: {
            full_name: userData.name || 'Little Friend',
            avatar_url: null
          }
        });
        setLoading(false);
        return;
      }

      // Otherwise check Supabase authentication
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-dvh bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Loading your magical portal...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-dvh bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Magical Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-green-300 rounded-full opacity-20 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Portal Header */}
      <PortalHeader 
        user={user} 
        isKidMode={isKidMode} 
        setIsKidMode={setIsKidMode}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Portal Content */}
      <div className="relative z-10">
        {activeSection === 'welcome' && (
          <WelcomeSection 
            user={user} 
            isKidMode={isKidMode}
            onStartProfile={() => setActiveSection('kid-profile')}
          />
        )}
        
        {activeSection === 'kid-profile' && (
          <KidProfile 
            user={user}
            onComplete={() => setActiveSection('parent-profile')}
            onBack={() => setActiveSection('welcome')}
          />
        )}
        
        {activeSection === 'parent-profile' && (
          <ParentProfile 
            user={user}
            onComplete={() => setActiveSection('videos')}
            onBack={() => setActiveSection('kid-profile')}
          />
        )}
        
        {activeSection === 'videos' && (
          <VideoGallery 
            user={user}
            onBack={() => setActiveSection('parent-profile')}
          />
        )}
        
        {activeSection === 'lessons' && (
          <MiniLessons 
            user={user}
            onBack={() => setActiveSection('videos')}
          />
        )}
      </div>

      {/* Portal Navigation */}
      <PortalNavigation 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isKidMode={isKidMode}
      />
    </main>
  );
}

function WelcomeSection({ user, isKidMode, onStartProfile }: { 
  user: any; 
  isKidMode: boolean; 
  onStartProfile: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Magical Portal Title */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-pulse">
            ✨ Welcome to Your Portal! ✨
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-6">
            {isKidMode ? "Hi there, little friend!" : "Welcome to your magical learning space!"}
          </p>
        </div>

        {/* Portal Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4">🎥</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your Videos</h3>
            <p className="text-gray-600">Watch your therapy sessions and see how amazing you're doing!</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Mini Lessons</h3>
            <p className="text-gray-600">Fun activities and lessons from Laura to practice at home!</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Your Progress</h3>
            <p className="text-gray-600">Track your amazing progress and celebrate your wins!</p>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={onStartProfile}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-2xl font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce"
        >
          {isKidMode ? "Let's Start Our Adventure! 🚀" : "Begin Your Journey! 🌟"}
        </button>

        {/* Magical Elements */}
        <div className="mt-12 text-6xl">
          <span className="animate-spin inline-block">🌟</span>
          <span className="animate-pulse inline-block mx-4">✨</span>
          <span className="animate-bounce inline-block">🎈</span>
        </div>
      </div>
    </div>
  );
}

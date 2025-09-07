"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { BRAND } from "../config";
import ParentDashboard from "@/components/ParentDashboard";
import ChildManagement from "@/components/ChildManagement";
import ProgressMonitoring from "@/components/ProgressMonitoring";
import PortalControls from "@/components/PortalControls";

export default function ParentPortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'dashboard' | 'children' | 'progress' | 'controls'>('dashboard');
  const [children, setChildren] = useState<any[]>([]);

  useEffect(() => {
    checkUser();
    loadChildren();
  }, []);

  const checkUser = async () => {
    try {
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

  const loadChildren = async () => {
    try {
      // For now, we'll use mock data. In production, this would fetch from Supabase
      const mockChildren = [
        {
          id: 'child-1',
          name: 'Emma',
          age: 5,
          pictureSequence: ['🐱', '🐶', '🐦', '🐠'],
          lastActive: '2024-01-20T10:30:00Z',
          progress: {
            lessonsCompleted: 8,
            videosWatched: 12,
            timeSpent: 45 // minutes
          },
          currentGoals: ['Speech sounds', 'Social interaction'],
          avatar: '👧'
        },
        {
          id: 'child-2',
          name: 'Liam',
          age: 7,
          pictureSequence: ['🍎', '🍌', '🍪', '🎂'],
          lastActive: '2024-01-20T14:15:00Z',
          progress: {
            lessonsCompleted: 15,
            videosWatched: 8,
            timeSpent: 67
          },
          currentGoals: ['Language development', 'Focus skills'],
          avatar: '👦'
        }
      ];
      setChildren(mockChildren);
    } catch (error) {
      console.error('Error loading children:', error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-dvh bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading your parent portal...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="min-h-dvh bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-2 border-blue-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  👨‍👩‍👧‍👦
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {BRAND} Parent Portal
                  </h1>
                  <p className="text-sm text-gray-600">
                    Manage your children's learning journey
                  </p>
                </div>
              </div>
            </div>

            {/* User Info and Actions */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user?.email?.charAt(0).toUpperCase() || 'P'}
                  </div>
                )}
                <span className="text-sm text-gray-700 hidden sm:block">
                  {user?.user_metadata?.full_name || user?.email}
                </span>
              </div>

              <form action="/auth/signout" method="post" className="inline">
                <button className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium">
                  Sign Out
                </button>
              </form>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center justify-center gap-6 mt-4">
            {[
              { key: 'dashboard', label: 'Dashboard', emoji: '📊' },
              { key: 'children', label: 'My Children', emoji: '👶' },
              { key: 'progress', label: 'Progress', emoji: '📈' },
              { key: 'controls', label: 'Controls', emoji: '⚙️' }
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveSection(item.key as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  activeSection === item.key
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection === 'dashboard' && (
          <ParentDashboard 
            user={user} 
            children={children}
            onViewChild={(childId) => setActiveSection('children')}
          />
        )}
        
        {activeSection === 'children' && (
          <ChildManagement 
            children={children}
            onAddChild={() => {/* TODO: Implement add child */}}
            onEditChild={(childId) => {/* TODO: Implement edit child */}}
            onViewProgress={(childId) => setActiveSection('progress')}
          />
        )}
        
        {activeSection === 'progress' && (
          <ProgressMonitoring 
            children={children}
            onBack={() => setActiveSection('dashboard')}
          />
        )}
        
        {activeSection === 'controls' && (
          <PortalControls 
            children={children}
            onBack={() => setActiveSection('dashboard')}
          />
        )}
      </div>
    </main>
  );
}

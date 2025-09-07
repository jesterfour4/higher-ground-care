"use client";

import React from "react";

interface Child {
  id: string;
  name: string;
  age: number;
  pictureSequence: string[];
  lastActive: string;
  progress: {
    lessonsCompleted: number;
    videosWatched: number;
    timeSpent: number;
  };
  currentGoals: string[];
  avatar: string;
}

interface ParentDashboardProps {
  user: any;
  children: Child[];
  onViewChild: (childId: string) => void;
}

export default function ParentDashboard({ user, children, onViewChild }: ParentDashboardProps) {
  const totalLessonsCompleted = children.reduce((sum, child) => sum + child.progress.lessonsCompleted, 0);
  const totalVideosWatched = children.reduce((sum, child) => sum + child.progress.videosWatched, 0);
  const totalTimeSpent = children.reduce((sum, child) => sum + child.progress.timeSpent, 0);

  const formatLastActive = (lastActive: string) => {
    const date = new Date(lastActive);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'Parent'}!
        </h1>
        <p className="text-xl text-gray-600">
          Here's how your children are doing in their learning journey
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Lessons Completed</p>
              <p className="text-3xl font-bold text-blue-600">{totalLessonsCompleted}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Videos Watched</p>
              <p className="text-3xl font-bold text-green-600">{totalVideosWatched}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎬</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Spent Learning</p>
              <p className="text-3xl font-bold text-purple-600">{totalTimeSpent}m</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Children Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Your Children</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            + Add Child
          </button>
        </div>

        {children.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👶</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No children added yet</h3>
            <p className="text-gray-500 mb-6">Add your first child to start their learning journey</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Add Your First Child
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => (
              <div
                key={child.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onViewChild(child.id)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-3xl">
                    {child.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{child.name}</h3>
                    <p className="text-gray-600">Age {child.age}</p>
                    <p className="text-sm text-gray-500">Last active: {formatLastActive(child.lastActive)}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Lessons completed:</span>
                    <span className="font-semibold">{child.progress.lessonsCompleted}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Videos watched:</span>
                    <span className="font-semibold">{child.progress.videosWatched}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time spent:</span>
                    <span className="font-semibold">{child.progress.timeSpent} minutes</span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Current goals:</p>
                  <div className="flex flex-wrap gap-2">
                    {child.currentGoals.map((goal, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                      >
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    View Progress
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="font-medium">View Progress Reports</p>
                  <p className="text-sm text-gray-600">See detailed progress for all children</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚙️</span>
                <div>
                  <p className="font-medium">Portal Settings</p>
                  <p className="text-sm text-gray-600">Manage portal controls and preferences</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="font-medium">Contact Therapist</p>
                  <p className="text-sm text-gray-600">Get in touch with Laura or your therapist</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {children.length > 0 ? (
              children.map((child) => (
                <div key={child.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{child.avatar}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{child.name} completed a lesson</p>
                    <p className="text-xs text-gray-600">{formatLastActive(child.lastActive)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

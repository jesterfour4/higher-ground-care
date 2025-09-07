"use client";

import React, { useState } from "react";

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

interface ProgressMonitoringProps {
  children: Child[];
  onBack: () => void;
}

export default function ProgressMonitoring({ children, onBack }: ProgressMonitoringProps) {
  const [selectedChild, setSelectedChild] = useState<string | 'all'>('all');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'all'>('month');

  const selectedChildData = selectedChild === 'all' ? children : children.filter(c => c.id === selectedChild);

  const totalProgress = selectedChildData.reduce((acc, child) => ({
    lessonsCompleted: acc.lessonsCompleted + child.progress.lessonsCompleted,
    videosWatched: acc.videosWatched + child.progress.videosWatched,
    timeSpent: acc.timeSpent + child.progress.timeSpent
  }), { lessonsCompleted: 0, videosWatched: 0, timeSpent: 0 });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Progress Monitoring</h1>
          <p className="text-gray-600 mt-2">Track your children's learning progress and achievements</p>
        </div>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Child</label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Children</option>
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
              <p className="text-3xl font-bold text-blue-600">{totalProgress.lessonsCompleted}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎓</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalProgress.lessonsCompleted / 20) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Goal: 20 lessons</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Videos Watched</p>
              <p className="text-3xl font-bold text-green-600">{totalProgress.videosWatched}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎬</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalProgress.videosWatched / 15) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Goal: 15 videos</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Time Spent</p>
              <p className="text-3xl font-bold text-purple-600">{totalProgress.timeSpent}m</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min((totalProgress.timeSpent / 120) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Goal: 120 minutes</p>
          </div>
        </div>
      </div>

      {/* Individual Child Progress */}
      {selectedChild === 'all' && (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Individual Progress</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {children.map((child) => (
              <div key={child.id} className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-3xl">
                    {child.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{child.name}</h3>
                    <p className="text-gray-600">Age {child.age}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{child.progress.lessonsCompleted}</p>
                    <p className="text-sm text-gray-600">Lessons</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{child.progress.videosWatched}</p>
                    <p className="text-sm text-gray-600">Videos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{child.progress.timeSpent}m</p>
                    <p className="text-sm text-gray-600">Time</p>
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {children.map((child) => (
            <div key={child.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl">{child.avatar}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {child.name} completed a lesson on speech sounds
                </p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
              <span className="text-green-600 text-sm font-medium">+1 lesson</span>
            </div>
          ))}
        </div>
      </div>

      {/* Goals and Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Current Goals</h2>
          <div className="space-y-3">
            {children.flatMap(child => child.currentGoals).map((goal, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{goal}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recommendations</h2>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-800">Great progress on speech sounds!</p>
              <p className="text-xs text-blue-600">Consider practicing with the mirror exercises</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">Ready for social skills lessons</p>
              <p className="text-xs text-green-600">Try the conversation practice activities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

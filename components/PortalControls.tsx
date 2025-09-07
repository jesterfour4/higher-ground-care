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

interface PortalControlsProps {
  children: Child[];
  onBack: () => void;
}

export default function PortalControls({ children, onBack }: PortalControlsProps) {
  const [settings, setSettings] = useState({
    dailyTimeLimit: 30, // minutes
    allowedCategories: ['speech', 'language', 'regulation', 'social'],
    requireParentApproval: false,
    weekendAccess: true,
    bedtimeRestriction: true,
    bedtimeHour: 20,
    bedtimeMinute: 0
  });

  const [selectedChild, setSelectedChild] = useState<string | 'all'>('all');

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const categories = [
    { key: 'speech', label: 'Speech Sounds', emoji: '🗣️' },
    { key: 'language', label: 'Language Development', emoji: '💬' },
    { key: 'regulation', label: 'Self-Regulation', emoji: '🧘' },
    { key: 'social', label: 'Social Skills', emoji: '👥' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Portal Controls</h1>
          <p className="text-gray-600 mt-2">Manage your children's portal access and safety settings</p>
        </div>
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Child Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Apply Settings To</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedChild('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedChild === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Children
          </button>
          {children.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedChild === child.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {child.avatar} {child.name}
            </button>
          ))}
        </div>
      </div>

      {/* Time Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">⏰ Time Controls</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Time Limit (minutes)
            </label>
            <input
              type="range"
              min="10"
              max="120"
              value={settings.dailyTimeLimit}
              onChange={(e) => handleSettingChange('dailyTimeLimit', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>10 min</span>
              <span className="font-medium">{settings.dailyTimeLimit} minutes</span>
              <span>120 min</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Weekend Access</label>
              <p className="text-xs text-gray-600">Allow portal access on weekends</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.weekendAccess}
                onChange={(e) => handleSettingChange('weekendAccess', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Bedtime Restriction</label>
              <p className="text-xs text-gray-600">Block access after bedtime</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.bedtimeRestriction}
                onChange={(e) => handleSettingChange('bedtimeRestriction', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {settings.bedtimeRestriction && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bedtime
              </label>
              <div className="flex gap-2">
                <select
                  value={settings.bedtimeHour}
                  onChange={(e) => handleSettingChange('bedtimeHour', parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
                <span className="flex items-center text-gray-600">:</span>
                <select
                  value={settings.bedtimeMinute}
                  onChange={(e) => handleSettingChange('bedtimeMinute', parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[0, 15, 30, 45].map(min => (
                    <option key={min} value={min}>
                      {min.toString().padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📚 Content Controls</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Allowed Lesson Categories
            </label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <label key={category.key} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.allowedCategories.includes(category.key)}
                    onChange={(e) => {
                      const newCategories = e.target.checked
                        ? [...settings.allowedCategories, category.key]
                        : settings.allowedCategories.filter(c => c !== category.key);
                      handleSettingChange('allowedCategories', newCategories);
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="mr-2">{category.emoji}</span>
                    {category.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Require Parent Approval</label>
              <p className="text-xs text-gray-600">New lessons need your approval before children can access them</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireParentApproval}
                onChange={(e) => handleSettingChange('requireParentApproval', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Safety Features */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🛡️ Safety Features</h2>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600">✅</span>
              <span className="font-medium text-green-800">Safe Content Only</span>
            </div>
            <p className="text-sm text-green-700">
              All content is pre-approved by therapists and designed for children
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600">🔒</span>
              <span className="font-medium text-blue-800">No External Links</span>
            </div>
            <p className="text-sm text-blue-700">
              Children cannot access external websites or apps
            </p>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-600">📊</span>
              <span className="font-medium text-purple-800">Activity Monitoring</span>
            </div>
            <p className="text-sm text-purple-700">
              You can see what your children are doing in real-time
            </p>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Save Settings</h3>
            <p className="text-sm text-gray-600">
              Apply these settings to {selectedChild === 'all' ? 'all children' : children.find(c => c.id === selectedChild)?.name}
            </p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

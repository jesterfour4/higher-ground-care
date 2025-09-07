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

interface ChildManagementProps {
  children: Child[];
  onAddChild: () => void;
  onEditChild: (childId: string) => void;
  onViewProgress: (childId: string) => void;
}

export default function ChildManagement({ children, onAddChild, onEditChild, onViewProgress }: ChildManagementProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChild, setNewChild] = useState({
    name: '',
    age: '',
    goals: '',
    pictureSequence: [] as string[]
  });

  const pictureSets = [
    { name: 'Animal Friends', emoji: '🐱', images: ['🐱', '🐶', '🐦', '🐠'] },
    { name: 'Colorful Shapes', emoji: '🔴', images: ['🔴', '🟦', '🟨', '⭐'] },
    { name: 'Fun Foods', emoji: '🍎', images: ['🍎', '🍌', '🍪', '🎂'] },
    { name: 'Playful Toys', emoji: '🧸', images: ['🧸', '⚽', '🧱', '🚗'] }
  ];

  const handleAddChild = () => {
    if (newChild.name && newChild.age && newChild.pictureSequence.length === 4) {
      // In production, this would save to Supabase
      console.log('Adding child:', newChild);
      setShowAddForm(false);
      setNewChild({ name: '', age: '', goals: '', pictureSequence: [] });
    }
  };

  const handlePictureSetSelect = (images: string[]) => {
    setNewChild({ ...newChild, pictureSequence: images });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Your Children</h1>
          <p className="text-gray-600 mt-2">Add, edit, and monitor your children's portal access</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Child
        </button>
      </div>

      {/* Add Child Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Add New Child</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Child's Name
                  </label>
                  <input
                    type="text"
                    value={newChild.name}
                    onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter child's name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={newChild.age}
                    onChange={(e) => setNewChild({ ...newChild, age: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter age"
                    min="3"
                    max="18"
                  />
                </div>
              </div>

              {/* Goals */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Learning Goals
                </label>
                <textarea
                  value={newChild.goals}
                  onChange={(e) => setNewChild({ ...newChild, goals: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="What would you like your child to focus on? (e.g., speech sounds, social skills, language development)"
                />
              </div>

              {/* Picture Sequence Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Choose Picture Login Sequence
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {pictureSets.map((set, index) => (
                    <button
                      key={index}
                      onClick={() => handlePictureSetSelect(set.images)}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        JSON.stringify(newChild.pictureSequence) === JSON.stringify(set.images)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="text-2xl mb-2">{set.emoji}</div>
                        <div className="text-sm font-medium text-gray-800 mb-2">{set.name}</div>
                        <div className="flex justify-center gap-1">
                          {set.images.map((image, imgIndex) => (
                            <span key={imgIndex} className="text-lg">{image}</span>
                          ))}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {newChild.pictureSequence.length > 0 && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ Picture sequence selected: {newChild.pictureSequence.join(' → ')}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleAddChild}
                  disabled={!newChild.name || !newChild.age || newChild.pictureSequence.length !== 4}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add Child
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Children List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Your Children ({children.length})</h2>
        </div>
        
        {children.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👶</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No children added yet</h3>
            <p className="text-gray-500 mb-6">Add your first child to start their learning journey</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Child
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {children.map((child) => (
              <div key={child.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-3xl">
                      {child.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{child.name}</h3>
                      <p className="text-gray-600">Age {child.age}</p>
                      <p className="text-sm text-gray-500">
                        Picture code: {child.pictureSequence.join(' → ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Progress</p>
                      <p className="font-semibold">
                        {child.progress.lessonsCompleted} lessons • {child.progress.videosWatched} videos
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewProgress(child.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        View Progress
                      </button>
                      <button
                        onClick={() => onEditChild(child.id)}
                        className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
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
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

interface MiniLessonsProps {
  user: any;
  onBack: () => void;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  age_range: string;
  skills: string[];
  materials: string[];
  instructions: string;
  created_at: string;
  completed: boolean;
}

export default function MiniLessons({ user, onBack }: MiniLessonsProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      // Mock data for now. In production, this would fetch from Supabase
      const mockLessons: Lesson[] = [
        {
          id: '1',
          title: 'Fun with Letter Sounds',
          description: 'Learn the sounds of letters A, B, and C through fun activities!',
          video_url: '/videos/lesson-letters.mp4',
          thumbnail_url: '/images/lesson-thumb-1.jpg',
          duration: 480,
          difficulty: 'easy',
          category: 'speech',
          age_range: '3-5 years',
          skills: ['Letter recognition', 'Sound production', 'Listening'],
          materials: ['Letter cards', 'Mirror', 'Fun stickers'],
          instructions: '1. Watch the video with your child\n2. Practice the sounds together\n3. Use the mirror to see mouth movements\n4. Celebrate each success!',
          created_at: '2024-01-15',
          completed: false
        },
        {
          id: '2',
          title: 'Story Time Adventures',
          description: 'Build language skills through interactive storytelling',
          video_url: '/videos/lesson-story.mp4',
          thumbnail_url: '/images/lesson-thumb-2.jpg',
          duration: 600,
          difficulty: 'medium',
          category: 'language',
          age_range: '4-6 years',
          skills: ['Vocabulary', 'Comprehension', 'Imagination'],
          materials: ['Picture books', 'Story props', 'Coloring sheets'],
          instructions: '1. Choose a story together\n2. Read with expression\n3. Ask questions about the story\n4. Act out favorite parts!',
          created_at: '2024-01-16',
          completed: true
        },
        {
          id: '3',
          title: 'Breathing and Relaxation',
          description: 'Learn calming techniques for better focus and communication',
          video_url: '/videos/lesson-breathing.mp4',
          thumbnail_url: '/images/lesson-thumb-3.jpg',
          duration: 360,
          difficulty: 'easy',
          category: 'regulation',
          age_range: '3-8 years',
          skills: ['Self-regulation', 'Focus', 'Calm communication'],
          materials: ['Soft blanket', 'Quiet space', 'Timer'],
          instructions: '1. Find a quiet, comfortable space\n2. Follow the breathing exercises\n3. Practice daily for best results\n4. Use when feeling overwhelmed',
          created_at: '2024-01-17',
          completed: false
        }
      ];
      
      setLessons(mockLessons);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { key: 'all', label: 'All Lessons', emoji: '📚' },
    { key: 'speech', label: 'Speech Sounds', emoji: '🗣️' },
    { key: 'language', label: 'Language', emoji: '💬' },
    { key: 'regulation', label: 'Self-Regulation', emoji: '🧘' },
    { key: 'social', label: 'Social Skills', emoji: '👥' }
  ];

  const filteredLessons = selectedCategory === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.category === selectedCategory);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Loading your lessons...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎓</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Mini Lessons & Activities
          </h2>
          <p className="text-xl text-gray-600">
            Fun activities to practice at home with your family!
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.key
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-purple-50 border-2 border-purple-200'
              }`}
            >
              <span className="mr-2">{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setSelectedLesson(lesson)}
            >
              {/* Lesson Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-blue-400 to-purple-400">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                    <div className="text-2xl">🎓</div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {formatDuration(lesson.duration)}
                </div>
                <div className="absolute top-2 left-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty.toUpperCase()}
                  </span>
                </div>
                {lesson.completed && (
                  <div className="absolute top-2 right-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      ✓ Completed
                    </span>
                  </div>
                )}
              </div>

              {/* Lesson Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                  {lesson.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {lesson.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">👶</span>
                    {lesson.age_range}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">🏷️</span>
                    {lesson.category.charAt(0).toUpperCase() + lesson.category.slice(1)}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(lesson.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center text-sm text-purple-600 font-medium">
                    <span className="mr-1">▶️</span>
                    Start Lesson
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={onBack}
            className="px-6 py-3 text-gray-600 hover:text-purple-600 font-medium transition-colors"
          >
            ← Back to Portal
          </button>
        </div>
      </div>

      {/* Lesson Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">{selectedLesson.title}</h3>
              <button
                onClick={() => setSelectedLesson(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {!showInstructions ? (
                <>
                  {/* Video Player */}
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🎓</div>
                      <p className="text-lg">Lesson video would be here</p>
                      <p className="text-sm text-gray-400 mt-2">
                        In production, this would show the actual lesson video
                      </p>
                    </div>
                  </div>

                  {/* Lesson Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Skills You'll Practice</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLesson.skills.map((skill, index) => (
                          <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">What You'll Need</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLesson.materials.map((material, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {material}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{selectedLesson.description}</p>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowInstructions(true)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    >
                      📋 View Instructions
                    </button>
                    <button
                      onClick={() => setSelectedLesson(null)}
                      className="px-6 py-3 border-2 border-purple-200 text-purple-600 rounded-full font-medium hover:bg-purple-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <button
                      onClick={() => setShowInstructions(false)}
                      className="text-purple-600 hover:text-purple-800 font-medium mb-4"
                    >
                      ← Back to Lesson
                    </button>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Step-by-Step Instructions</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-gray-700">{selectedLesson.instructions}</pre>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

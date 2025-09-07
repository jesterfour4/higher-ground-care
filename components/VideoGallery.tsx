"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

interface VideoGalleryProps {
  user: any;
  onBack: () => void;
}

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  duration: number;
  created_at: string;
  type: 'session' | 'lesson' | 'celebration';
  category: string;
}

export default function VideoGallery({ user, onBack }: VideoGalleryProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      // For now, we'll use mock data. In production, this would fetch from Supabase
      const mockVideos: Video[] = [
        {
          id: '1',
          title: 'Your First Session with Laura!',
          description: 'Watch your amazing progress from your first session',
          video_url: '/videos/session-1.mp4',
          thumbnail_url: '/images/video-thumb-1.jpg',
          duration: 1200,
          created_at: '2024-01-15',
          type: 'session',
          category: 'sessions'
        },
        {
          id: '2',
          title: 'Fun with Sounds - Letter A',
          description: 'Practice the letter A with fun activities',
          video_url: '/videos/lesson-a.mp4',
          thumbnail_url: '/images/video-thumb-2.jpg',
          duration: 300,
          created_at: '2024-01-16',
          type: 'lesson',
          category: 'lessons'
        },
        {
          id: '3',
          title: 'Celebration - You Did It!',
          description: 'Celebrating your amazing progress this week',
          video_url: '/videos/celebration-1.mp4',
          thumbnail_url: '/images/video-thumb-3.jpg',
          duration: 180,
          created_at: '2024-01-17',
          type: 'celebration',
          category: 'celebrations'
        }
      ];
      
      setVideos(mockVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { key: 'all', label: 'All Videos', emoji: '🎬' },
    { key: 'sessions', label: 'Your Sessions', emoji: '🎥' },
    { key: 'lessons', label: 'Mini Lessons', emoji: '📚' },
    { key: 'celebrations', label: 'Celebrations', emoji: '🎉' }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium">Loading your videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Your Video Library
          </h2>
          <p className="text-xl text-gray-600">
            Watch your sessions, learn new things, and celebrate your progress!
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

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📹</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No videos yet</h3>
            <p className="text-gray-500">Your videos will appear here after your first session!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-purple-400 to-pink-400">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[12px] border-l-purple-600 border-y-[8px] border-y-transparent ml-1"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {formatDuration(video.duration)}
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      video.type === 'session' ? 'bg-blue-100 text-blue-800' :
                      video.type === 'lesson' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {video.type === 'session' ? '🎥 Session' :
                       video.type === 'lesson' ? '📚 Lesson' : '🎉 Celebration'}
                    </span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(video.created_at).toLocaleDateString()}</span>
                    <span className="flex items-center">
                      <span className="mr-1">👀</span>
                      Watch
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">{selectedVideo.title}</h3>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg">Video player would be here</p>
                  <p className="text-sm text-gray-400 mt-2">
                    In production, this would show the actual video
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

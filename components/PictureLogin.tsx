"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

interface PictureLoginProps {
  onSuccess: (userId: string) => void;
  onBack: () => void;
}

interface PictureSequence {
  id: string;
  images: string[];
  name: string;
  emoji: string;
}

export default function PictureLogin({ onSuccess, onBack }: PictureLoginProps) {
  const [pictureSequences, setPictureSequences] = useState<PictureSequence[]>([]);
  const [selectedSequence, setSelectedSequence] = useState<PictureSequence | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userSequence, setUserSequence] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPictureSequences();
  }, []);

  const loadPictureSequences = async () => {
    try {
      // Using emoji-based pictures for now since we don't have actual image files
      const mockSequences: PictureSequence[] = [
        {
          id: '1',
          name: 'Animal Friends',
          emoji: '🐱',
          images: [
            '🐱', '🐶', '🐦', '🐠'
          ]
        },
        {
          id: '2',
          name: 'Colorful Shapes',
          emoji: '🔴',
          images: [
            '🔴', '🟦', '🟨', '⭐'
          ]
        },
        {
          id: '3',
          name: 'Fun Foods',
          emoji: '🍎',
          images: [
            '🍎', '🍌', '🍪', '🎂'
          ]
        },
        {
          id: '4',
          name: 'Playful Toys',
          emoji: '🧸',
          images: [
            '🧸', '⚽', '🧱', '🚗'
          ]
        }
      ];
      
      setPictureSequences(mockSequences);
    } catch (error) {
      console.error('Error loading picture sequences:', error);
      setError('Failed to load picture sequences');
    }
  };

  const handleSequenceSelect = (sequence: PictureSequence) => {
    setSelectedSequence(sequence);
    setCurrentStep(0);
    setUserSequence([]);
    setError(null);
  };

  const handlePictureSelect = (imageIndex: number) => {
    if (!selectedSequence) return;

    const newSequence = [...userSequence, selectedSequence.images[imageIndex]];
    setUserSequence(newSequence);

    if (newSequence.length === selectedSequence.images.length) {
      // Complete sequence entered
      handleLogin(newSequence);
    } else {
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  const handleLogin = async (sequence: string[]) => {
    setLoading(true);
    setError(null);

    try {
      // Check if this is a new sequence (first time setup)
      const sequenceKey = `picture_sequence_${sequence.join('_')}`;
      const existingSequence = localStorage.getItem(sequenceKey);
      
      if (existingSequence) {
        // Existing user - sign them in
        const userData = JSON.parse(existingSequence);
        console.log('Signing in existing user:', userData);
        
        // For now, we'll create a mock user session
        // In production, this would authenticate with Supabase
        setTimeout(() => {
          onSuccess(userData.userId || 'picture-user-' + Date.now());
        }, 1000);
      } else {
        // New user - create account and store sequence
        const userId = 'picture-user-' + Date.now();
        const userData = {
          userId: userId,
          sequence: sequence,
          createdAt: new Date().toISOString(),
          name: 'Picture User'
        };
        
        localStorage.setItem(sequenceKey, JSON.stringify(userData));
        console.log('Created new picture user:', userData);
        
        setTimeout(() => {
          onSuccess(userId);
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  const resetLogin = () => {
    setSelectedSequence(null);
    setCurrentStep(0);
    setUserSequence([]);
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-600 font-medium text-xl">Logging you in...</p>
          <p className="text-gray-600 mt-2">Just a moment!</p>
        </div>
      </div>
    );
  }

  if (!selectedSequence) {
    // Sequence selection screen
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 px-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="text-8xl mb-6">🔐</div>
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Choose Your Secret Picture Code!
            </h1>
            <p className="text-xl text-gray-600">
              Pick a set of pictures that you'll remember. You'll use these to log in next time!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pictureSequences.map((sequence) => (
              <button
                key={sequence.id}
                onClick={() => handleSequenceSelect(sequence)}
                className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-left"
              >
                <div className="text-6xl mb-4">{sequence.emoji}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{sequence.name}</h3>
                <div className="flex gap-2 mb-4">
                  {sequence.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center text-2xl"
                    >
                      {image}
                    </div>
                  ))}
                </div>
                <p className="text-gray-600">Click to select this picture sequence</p>
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              ← Back to regular login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Picture sequence entry screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{selectedSequence.emoji}</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {selectedSequence.name}
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Step {currentStep + 1} of {selectedSequence.images.length}
          </p>
          
          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mb-8">
            {selectedSequence.images.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full ${
                  index <= currentStep ? 'bg-purple-600' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">
            {currentStep === 0 && "Click the first picture in your sequence"}
            {currentStep === 1 && "Now click the second picture"}
            {currentStep === 2 && "Click the third picture"}
            {currentStep === 3 && "Finally, click the last picture"}
          </h3>

          <div className="grid grid-cols-2 gap-6">
            {selectedSequence.images.map((image, index) => (
              <button
                key={index}
                onClick={() => handlePictureSelect(index)}
                className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-6xl hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {image}
              </button>
            ))}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700 text-center">
              {error}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={resetLogin}
              className="px-6 py-3 text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              ← Choose Different Pictures
            </button>
            
            <button
              onClick={onBack}
              className="px-6 py-3 text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

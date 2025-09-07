"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface KidProfileProps {
  user: any;
  onComplete: () => void;
  onBack: () => void;
}

export default function KidProfile({ user, onComplete, onBack }: KidProfileProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    favoriteColor: '',
    favoriteAnimal: '',
    favoriteFood: '',
    favoriteActivity: '',
    whatMakesMeHappy: '',
    whatImGoodAt: '',
    whatIWantToLearn: '',
    mySuperpower: '',
    myFriends: '',
    myFamily: '',
    myPets: '',
    myFavoritePlace: '',
    myDream: ''
  });
  const [saving, setSaving] = useState(false);

  const steps = [
    {
      title: "Hi there! What's your name?",
      emoji: "👋",
      fields: [
        { key: 'name', label: 'My name is', type: 'text', placeholder: 'Enter your name' }
      ]
    },
    {
      title: "How old are you?",
      emoji: "🎂",
      fields: [
        { key: 'age', label: 'I am', type: 'number', placeholder: 'Enter your age' }
      ]
    },
    {
      title: "Tell us about your favorites!",
      emoji: "⭐",
      fields: [
        { key: 'favoriteColor', label: 'My favorite color is', type: 'text', placeholder: 'Red, blue, green...' },
        { key: 'favoriteAnimal', label: 'My favorite animal is', type: 'text', placeholder: 'Dogs, cats, elephants...' },
        { key: 'favoriteFood', label: 'My favorite food is', type: 'text', placeholder: 'Pizza, ice cream...' },
        { key: 'favoriteActivity', label: 'My favorite activity is', type: 'text', placeholder: 'Playing, drawing, reading...' }
      ]
    },
    {
      title: "What makes you special?",
      emoji: "🌟",
      fields: [
        { key: 'whatMakesMeHappy', label: 'What makes me happy is', type: 'textarea', placeholder: 'Tell us what makes you smile!' },
        { key: 'whatImGoodAt', label: 'I am really good at', type: 'textarea', placeholder: 'What are you awesome at?' },
        { key: 'whatIWantToLearn', label: 'I want to learn', type: 'textarea', placeholder: 'What would you like to learn?' },
        { key: 'mySuperpower', label: 'My superpower is', type: 'text', placeholder: 'What makes you super special?' }
      ]
    },
    {
      title: "Tell us about your world!",
      emoji: "🌍",
      fields: [
        { key: 'myFriends', label: 'My friends are', type: 'textarea', placeholder: 'Tell us about your friends!' },
        { key: 'myFamily', label: 'My family includes', type: 'textarea', placeholder: 'Tell us about your family!' },
        { key: 'myPets', label: 'My pets are', type: 'text', placeholder: 'Do you have any pets?' },
        { key: 'myFavoritePlace', label: 'My favorite place is', type: 'text', placeholder: 'Where do you love to go?' },
        { key: 'myDream', label: 'My dream is', type: 'textarea', placeholder: 'What do you dream about?' }
      ]
    }
  ];

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSave();
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save kid profile data to Supabase
      const { error } = await supabase
        .from('kid_profiles')
        .upsert({
          user_id: user.id,
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving kid profile:', error);
        alert('Oops! Something went wrong. Please try again.');
        return;
      }

      onComplete();
    } catch (error) {
      console.error('Error saving kid profile:', error);
      alert('Oops! Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const currentStepData = steps[currentStep];
  const isStepComplete = currentStepData.fields.every(field => formData[field.key as keyof typeof formData]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          {/* Step Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-bounce">{currentStepData.emoji}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600">
              {currentStep === 0 && "We're so excited to meet you!"}
              {currentStep === 1 && "We need to know how old our new friend is!"}
              {currentStep === 2 && "Help us get to know what you love!"}
              {currentStep === 3 && "You are amazing! Tell us why!"}
              {currentStep === 4 && "We want to know about your world!"}
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {currentStepData.fields.map((field) => (
              <div key={field.key}>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.key as keyof typeof formData]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={onBack}
              className="px-6 py-3 text-gray-600 hover:text-purple-600 font-medium transition-colors"
            >
              ← Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isStepComplete || saving}
              className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                isStepComplete && !saving
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </span>
              ) : currentStep === steps.length - 1 ? (
                'Finish! 🎉'
              ) : (
                'Next Step →'
              )}
            </button>
          </div>
        </div>

        {/* Fun Elements */}
        <div className="text-center mt-8 text-4xl">
          <span className="animate-pulse inline-block mx-2">✨</span>
          <span className="animate-bounce inline-block mx-2">🌟</span>
          <span className="animate-pulse inline-block mx-2">🎈</span>
        </div>
      </div>
    </div>
  );
}

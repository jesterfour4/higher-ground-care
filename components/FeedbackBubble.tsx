"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

interface FeedbackData {
  emoji: string;
  feedback: string;
  page: string;
  timestamp: string;
}

export default function FeedbackBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean;
    message?: string;
    error?: string;
  } | null>(null);

  const emojis = [
    { value: "😢", label: "Sad", description: "Not satisfied" },
    { value: "😐", label: "Neutral", description: "Okay" },
    { value: "😊", label: "Happy", description: "Very satisfied" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEmoji) {
      setSubmitStatus({
        success: false,
        error: "Please select an emoji."
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const feedbackData: FeedbackData = {
        emoji: selectedEmoji,
        feedback: feedback.trim(),
        page: window.location.pathname,
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('feedback')
        .insert([feedbackData]);

      if (error) throw error;

      setSubmitStatus({
        success: true,
        message: "Thank you for your feedback!"
      });

      // Reset form
      setSelectedEmoji("");
      setFeedback("");

      // Close modal after a short delay
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus({
        success: false,
        error: "Failed to submit feedback. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      setSelectedEmoji("");
      setFeedback("");
      setSubmitStatus(null);
    }
  };

  return (
    <>
      {/* Fun Crayon Speech Bubble - Bottom Right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 z-40 group cursor-pointer"
        aria-label="Provide feedback"
      >
        {/* Main bubble with crayon texture */}
        <div className="relative">
          {/* Crayon bubble body */}
          <div className="w-20 h-20 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full shadow-lg border-4 border-white transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-2xl">
            {/* Crayon texture lines */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute top-2 left-3 w-8 h-0.5 bg-white/60 rounded-full transform rotate-12"></div>
              <div className="absolute top-4 left-2 w-6 h-0.5 bg-white/60 rounded-full transform -rotate-6"></div>
              <div className="absolute top-6 left-4 w-7 h-0.5 bg-white/60 rounded-full transform rotate-3"></div>
              <div className="absolute top-8 left-1 w-5 h-0.5 bg-white/60 rounded-full transform -rotate-12"></div>
            </div>
            
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-white transform rotate-12"></div>
            
            {/* Emoji icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">💬</span>
            </div>
          </div>
          
          {/* Floating sparkles */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-100"></div>
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-blue-300 rounded-full animate-pulse delay-200"></div>
        </div>
        
        {/* Fun text bubble */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full border-2 border-purple-300 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="text-xs font-bold text-purple-600">Tell us!</span>
        </div>
      </button>

      {/* Feedback Modal with Pop Animation */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div 
            className="relative mx-4 w-full max-w-sm sm:max-w-md rounded-3xl border-4 border-purple-300 bg-white/70 backdrop-blur-sm p-4 sm:p-6 shadow-2xl transform transition-all duration-500"
            style={{
              animation: 'crayonBubblePop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            {/* Crayon texture decorations */}
            <div className="absolute top-2 left-4 w-8 h-1 bg-pink-200 rounded-full transform rotate-12"></div>
            <div className="absolute top-4 right-6 w-6 h-1 bg-blue-200 rounded-full transform -rotate-6"></div>
            <div className="absolute bottom-4 left-6 w-7 h-1 bg-purple-200 rounded-full transform rotate-3"></div>
            
            {/* Close button with crayon style */}
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedEmoji("");
                setFeedback("");
                setSubmitStatus(null);
              }}
              className="absolute right-4 top-4 rounded-full p-2 text-purple-600 hover:bg-purple-100 hover:text-purple-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 transition-colors duration-200"
              aria-label="Close feedback form"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header with fun styling */}
            <div className="mb-4 sm:mb-6 text-center">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                How are we doing? 🎨
              </h2>
              <p className="mt-2 text-sm sm:text-base text-blue-600 font-bold">
                We'd love to hear your thoughts! ✨
              </p>
            </div>

            {/* Form with enhanced styling */}
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {/* Emoji Selection with crayon borders */}
              <div>
                <label className="block text-sm font-bold text-green-600 mb-2 sm:mb-3">
                  How would you rate your experience? 🎯
                </label>
                <div className="flex gap-2 sm:gap-3">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji.value}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji.value)}
                      className={`flex-1 flex flex-col items-center p-2 sm:p-3 rounded-2xl border-3 transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 ${
                        selectedEmoji === emoji.value
                          ? 'border-purple-500 bg-white shadow-lg'
                          : 'border-pink-200 hover:border-purple-400 hover:bg-white/80'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl mb-1 filter drop-shadow-sm">{emoji.value}</span>
                      <span className="text-xs font-bold text-gray-900">{emoji.label}</span>
                      <span className="text-xs text-gray-700 hidden sm:block">{emoji.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text with crayon style */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-bold text-purple-600 mb-2">
                  Tell us more (optional) 💭
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What went well? What could we improve? 🚀"
                  rows={3}
                  className="w-full rounded-2xl border-3 border-pink-200 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/40 focus:border-purple-500 transition-all duration-200 placeholder-gray-500 text-gray-900"
                />
              </div>

              {/* Submit Status with fun styling */}
              {submitStatus && (
                <div className={`p-3 rounded-2xl text-sm border-2 ${
                  submitStatus.success 
                    ? 'bg-white text-green-800 border-green-400'
                    : 'bg-white text-red-800 border-red-400'
                }`}>
                  {submitStatus.message || submitStatus.error}
                </div>
              )}

              {/* Submit Button with crayon style */}
              <button
                type="submit"
                disabled={isSubmitting || !selectedEmoji}
                className="w-full rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-6 py-3 text-sm font-bold text-white hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 hover:shadow-lg border-2 border-white/20"
              >
                {isSubmitting ? 'Submitting... 📝' : 'Submit Feedback 🎉'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom CSS for crayon bubble pop animation */}
      <style jsx>{`
        @keyframes crayonBubblePop {
          0% {
            opacity: 0;
            transform: scale(0.1) rotate(-180deg) translateY(100px);
          }
          50% {
            transform: scale(1.1) rotate(5deg) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg) translateY(0);
          }
        }
        
        .border-3 {
          border-width: 3px;
        }
        
        .border-4 {
          border-width: 4px;
        }
      `}</style>
    </>
  );
}

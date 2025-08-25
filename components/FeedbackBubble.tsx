"use client";

import React, { useState, useEffect } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Initialize Supabase client only on the client side
let supabase: SupabaseClient | null = null;

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

  // Initialize Supabase client on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !supabase) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      // Validate URL format before creating client
      if (supabaseUrl && supabaseKey) {
        try {
          // Test if the URL is valid
          new URL(supabaseUrl);
          supabase = createClient(supabaseUrl, supabaseKey);
        } catch (error) {
          console.warn('Invalid Supabase URL format:', supabaseUrl);
          // Don't create client if URL is invalid
        }
      }
    }
  }, []);

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

    if (!supabase) {
      // For development/testing without Supabase, just show success
      setSubmitStatus({
        success: true,
        message: "Thank you for your feedback! (Demo mode - not saved to database)"
      });
      
      // Reset form
      setSelectedEmoji("");
      setFeedback("");
      
      // Close modal after a short delay
      setTimeout(() => {
        setIsOpen(false);
        setSubmitStatus(null);
      }, 2000);
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
      {/* Floating Feedback Bubble */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-orange-400 hover:bg-orange-500 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/40"
        aria-label="Provide feedback"
      >
        <span className="text-xl sm:text-2xl">💬</span>
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div 
            className="relative mx-4 w-full max-w-sm sm:max-w-md rounded-3xl border border-app-line bg-app-soft p-4 sm:p-6 shadow-2xl transform transition-all duration-300"
            style={{
              animation: 'feedbackModalPop 0.3s ease-out'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedEmoji("");
                setFeedback("");
                setSubmitStatus(null);
              }}
              className="absolute right-4 top-4 rounded-full p-2 text-app-muted hover:bg-white/50 hover:text-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
              aria-label="Close feedback form"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">How are we doing?</h2>
              <p className="mt-2 text-sm sm:text-base text-app-muted">We'd love to hear your thoughts!</p>
            </div>

            {/* Form */}
            <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
              {/* Emoji Selection */}
              <div>
                <label className="block text-sm font-medium text-app-ink mb-2 sm:mb-3">
                  How would you rate your experience?
                </label>
                <div className="flex gap-2 sm:gap-3">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji.value}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji.value)}
                      className={`flex-1 flex flex-col items-center p-2 sm:p-3 rounded-2xl border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)]/40 ${
                        selectedEmoji === emoji.value
                          ? 'border-[color:var(--green)] bg-[color:var(--green)]/10'
                          : 'border-app-line hover:border-[color:var(--green)]/50'
                      }`}
                    >
                      <span className="text-2xl sm:text-3xl mb-1">{emoji.value}</span>
                      <span className="text-xs font-medium text-app-ink">{emoji.label}</span>
                      <span className="text-xs text-app-muted hidden sm:block">{emoji.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback Text */}
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-app-ink mb-2">
                  Tell us more (optional)
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What went well? What could we improve?"
                  rows={3}
                  className="w-full rounded-2xl border border-app-line bg-white/70 px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[color:var(--green)]/40 focus:border-[color:var(--green)]"
                />
              </div>

              {/* Submit Status */}
              {submitStatus && (
                <div className={`p-3 rounded-2xl text-sm ${
                  submitStatus.success 
                    ? 'bg-[color:var(--green)]/20 text-[color:var(--green)] border border-[color:var(--green)]/30'
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {submitStatus.message || submitStatus.error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !selectedEmoji}
                className="w-full rounded-2xl bg-[color:var(--green)] px-6 py-3 text-sm font-medium text-app-ink/90 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Custom CSS for animation */}
      <style jsx>{`
        @keyframes feedbackModalPop {
          0% {
            opacity: 0;
            transform: scale(0.8) translateX(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateX(0);
          }
        }
      `}</style>
    </>
  );
}

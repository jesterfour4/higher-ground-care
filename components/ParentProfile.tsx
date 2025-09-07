"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface ParentProfileProps {
  user: any;
  onComplete: () => void;
  onBack: () => void;
}

export default function ParentProfile({ user, onComplete, onBack }: ParentProfileProps) {
  const [formData, setFormData] = useState({
    relationship: '',
    childName: '',
    childAge: '',
    childInterests: '',
    childChallenges: '',
    childStrengths: '',
    familyGoals: '',
    concerns: '',
    previousTherapy: '',
    communicationPreferences: '',
    availability: '',
    emergencyContact: '',
    medicalInfo: '',
    additionalNotes: ''
  });
  const [saving, setSaving] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('parent_profiles')
        .upsert({
          user_id: user.id,
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving parent profile:', error);
        alert('Something went wrong. Please try again.');
        return;
      }

      onComplete();
    } catch (error) {
      console.error('Error saving parent profile:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Parent & Caregiver Information
            </h2>
            <p className="text-xl text-gray-600">
              Help us understand your family and how we can best support you
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-8">
            {/* Family Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Your relationship to the child
                </label>
                <select
                  value={formData.relationship}
                  onChange={(e) => handleInputChange('relationship', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                  required
                >
                  <option value="">Select relationship</option>
                  <option value="parent">Parent</option>
                  <option value="guardian">Guardian</option>
                  <option value="grandparent">Grandparent</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Child's name
                </label>
                <input
                  type="text"
                  value={formData.childName}
                  onChange={(e) => handleInputChange('childName', e.target.value)}
                  placeholder="Enter child's name"
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Child's age
                </label>
                <input
                  type="number"
                  value={formData.childAge}
                  onChange={(e) => handleInputChange('childAge', e.target.value)}
                  placeholder="Enter age"
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Emergency contact
                </label>
                <input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Name and phone number"
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                />
              </div>
            </div>

            {/* Child Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">About Your Child</h3>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  What are your child's interests and hobbies?
                </label>
                <textarea
                  value={formData.childInterests}
                  onChange={(e) => handleInputChange('childInterests', e.target.value)}
                  placeholder="Tell us what your child loves to do..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg resize-none"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  What challenges is your child currently facing?
                </label>
                <textarea
                  value={formData.childChallenges}
                  onChange={(e) => handleInputChange('childChallenges', e.target.value)}
                  placeholder="Please share any concerns or challenges..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg resize-none"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  What are your child's strengths?
                </label>
                <textarea
                  value={formData.childStrengths}
                  onChange={(e) => handleInputChange('childStrengths', e.target.value)}
                  placeholder="Tell us what your child does well..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg resize-none"
                />
              </div>
            </div>

            {/* Goals and Concerns */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Goals & Expectations</h3>
              
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  What are your family's goals for therapy?
                </label>
                <textarea
                  value={formData.familyGoals}
                  onChange={(e) => handleInputChange('familyGoals', e.target.value)}
                  placeholder="What would you like to achieve through therapy?"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg resize-none"
                />
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Any specific concerns or questions?
                </label>
                <textarea
                  value={formData.concerns}
                  onChange={(e) => handleInputChange('concerns', e.target.value)}
                  placeholder="Is there anything specific you'd like us to know?"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg resize-none"
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Previous therapy experience
                  </label>
                  <textarea
                    value={formData.previousTherapy}
                    onChange={(e) => handleInputChange('previousTherapy', e.target.value)}
                    placeholder="Any previous therapy or interventions?"
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg resize-none"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Communication preferences
                  </label>
                  <select
                    value={formData.communicationPreferences}
                    onChange={(e) => handleInputChange('communicationPreferences', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                  >
                    <option value="">Select preference</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone calls</option>
                    <option value="text">Text messages</option>
                    <option value="portal">Portal messages</option>
                  </select>
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Best times for contact
                  </label>
                  <input
                    type="text"
                    value={formData.availability}
                    onChange={(e) => handleInputChange('availability', e.target.value)}
                    placeholder="e.g., Weekdays 2-4 PM"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Medical information
                  </label>
                  <input
                    type="text"
                    value={formData.medicalInfo}
                    onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                    placeholder="Any relevant medical information"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Additional notes
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                  placeholder="Anything else you'd like us to know?"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg resize-none"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={onBack}
                className="px-6 py-3 text-gray-600 hover:text-purple-600 font-medium transition-colors"
              >
                ← Back
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                  saving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </span>
                ) : (
                  'Complete Profile! 🎉'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

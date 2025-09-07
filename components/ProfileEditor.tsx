"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

interface Profile {
  id: string;
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  provider: string | null;
  provider_id: string | null;
  created_at: string;
  updated_at: string;
}

interface ProfileEditorProps {
  onSave?: (profile: Profile) => void;
  onCancel?: () => void;
  showCancel?: boolean;
}

export default function ProfileEditor({ onSave, onCancel, showCancel = false }: ProfileEditorProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    avatar_url: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile');
        return;
      }

      setProfile(data);
      setFormData({
        full_name: data.full_name || "",
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        avatar_url: data.avatar_url || "",
      });
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in to update your profile');
        return;
      }

      // Update the profile
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name || null,
          first_name: formData.first_name || null,
          last_name: formData.last_name || null,
          email: formData.email || null,
          phone: formData.phone || null,
          avatar_url: formData.avatar_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating profile:', updateError);
        setError('Failed to update profile');
        return;
      }

      setSuccess('Profile updated successfully!');
      
      // Fetch updated profile
      await fetchProfile();
      
      if (onSave) {
        onSave(profile!);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-app-muted">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt="Profile"
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-app-soft flex items-center justify-center">
            <span className="text-2xl font-semibold text-app-muted">
              {formData.full_name?.charAt(0) || formData.first_name?.charAt(0) || '?'}
            </span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <p className="text-sm text-app-muted">
            {profile?.provider === 'google' ? 'Connected via Google' : 'Email account'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-app-ink/90 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-app-line bg-white/70 px-4 py-3 text-app-ink placeholder:text-app-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-app-ink/90 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="w-full rounded-xl border border-app-line bg-white/70 px-4 py-3 text-app-ink placeholder:text-app-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-app-ink/90 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-app-line bg-white/70 px-4 py-3 text-app-ink placeholder:text-app-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-app-ink/90 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-app-line bg-white/70 px-4 py-3 text-app-ink placeholder:text-app-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-app-ink/90 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-app-line bg-white/70 px-4 py-3 text-app-ink placeholder:text-app-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-app-ink/90 mb-2">
            Avatar URL
          </label>
          <input
            type="url"
            name="avatar_url"
            value={formData.avatar_url}
            onChange={handleInputChange}
            className="w-full rounded-xl border border-app-line bg-white/70 px-4 py-3 text-app-ink placeholder:text-app-muted/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
            placeholder="Enter avatar image URL"
          />
        </div>

        {/* Status Messages */}
        {error && (
          <div className="p-3 rounded-xl border text-sm text-red-700 bg-red-50 border-red-200">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl border text-sm text-green-700 bg-green-50 border-green-200">
            {success}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-xl bg-app-ink px-4 py-3 text-sm font-medium text-app hover:bg-app-ink/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {showCancel && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-app-line bg-white/70 px-4 py-3 text-sm font-medium text-app-ink hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/20"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

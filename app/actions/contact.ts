'use server'

import { submitContactForm, ContactFormData } from '@/lib/supabase'

export async function handleContactForm(data: ContactFormData) {
  console.log('=== SERVER ACTION STARTED ===');
  console.log('Contact form data received:', data);
  
  try {
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      console.log('Validation failed:', { name: !!data.name, email: !!data.email, message: !!data.message });
      return { success: false, error: 'Please fill in all required fields.' }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      console.log('Email validation failed:', data.email);
      return { success: false, error: 'Please enter a valid email address.' }
    }

    console.log('Validation passed, submitting to Supabase...');
    // Submit to Supabase
    const result = await submitContactForm(data)
    console.log('Supabase result:', result);
    
    if (result.success) {
      console.log('=== SERVER ACTION SUCCESS ===');
      return { success: true, message: 'Thank you for your message! We\'ll get back to you soon.' }
    } else {
      console.log('Supabase submission failed:', result.error);
      return { success: false, error: 'Failed to submit form. Please try again.' }
    }
  } catch (error) {
    console.error('=== SERVER ACTION ERROR ===', error)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}

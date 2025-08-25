'use server'

import { submitContactForm, ContactFormData } from '@/lib/supabase'

export async function handleContactForm(data: ContactFormData) {
  try {
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return { success: false, error: 'Please fill in all required fields.' }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return { success: false, error: 'Please enter a valid email address.' }
    }

    // Submit to Supabase
    const result = await submitContactForm(data)
    
    if (result.success) {
      return { success: true, message: 'Thank you for your message! We\'ll get back to you soon.' }
    } else {
      return { success: false, error: 'Failed to submit form. Please try again.' }
    }
  } catch (error) {
    console.error('Error in contact form action:', error)
    return { success: false, error: 'An unexpected error occurred. Please try again.' }
  }
}

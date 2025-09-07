import { supabase } from './supabase/client'

// Types for the contact form data
export interface ContactFormData {
  name: string
  email: string
  phone: string
  childAge: string
  message: string
  createdAt?: string
}

// Function to submit contact form data
export async function submitContactForm(data: ContactFormData) {
  try {
    console.log('Supabase: Starting submission with data:', data);
    console.log('Supabase: URL and key check:', { 
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL, 
      hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
    });
    
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          child_age: data.childAge,
          message: data.message,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    console.log('Supabase: Insert result:', { result, error });

    if (error) {
      console.error('Error submitting form:', error)
      return { success: false, error: error.message || 'Database error occurred' }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Error submitting form:', error)
    return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred' }
  }
}

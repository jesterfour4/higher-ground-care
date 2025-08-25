import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

    if (error) {
      console.error('Error submitting form:', error)
      throw error
    }

    return { success: true, data: result }
  } catch (error) {
    console.error('Error submitting form:', error)
    return { success: false, error }
  }
}

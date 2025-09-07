import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
}

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export async function POST(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not available. Please try again later.' },
        { status: 503 }
      );
    }

    const { email, program, note } = await request.json();

    // Validate required fields
    if (!email || !program) {
      return NextResponse.json(
        { error: 'Email and program are required' },
        { status: 400 }
      );
    }

    // Validate program type
    if (!['group', 'retreat'].includes(program)) {
      return NextResponse.json(
        { error: 'Program must be either "group" or "retreat"' },
        { status: 400 }
      );
    }

    // Insert interest into database
    const { data, error } = await supabase
      .from('program_interest')
      .insert([
        {
          email,
          program,
          note: note || null,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Error inserting program interest:', error);
      return NextResponse.json(
        { error: `Failed to submit interest: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('Program interest submitted successfully:', data);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Interest submitted successfully',
        data: data[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error processing program interest:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

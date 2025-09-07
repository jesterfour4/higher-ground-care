import { NextResponse, type NextRequest } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const referralData = await request.json();
    console.log('Received referral data:', referralData);
    
    // Validate required fields
    const requiredFields = ['referringProvider', 'providerEmail', 'clinicName', 'clientName', 'primaryConcerns'];
    for (const field of requiredFields) {
      if (!referralData[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Get Supabase client
    const supabase = supabaseServer();

    // First, let's check if the referrals table exists
    const { data: tableCheck, error: tableError } = await supabase
      .from('referrals')
      .select('id')
      .limit(1);

    if (tableError) {
      console.error('Table check error:', tableError);
      
      // If the referrals table doesn't exist, fall back to contact form submission
      console.log('Referrals table not found, falling back to contact form submission...');
      
      const { data: contactData, error: contactError } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: referralData.referringProvider,
            email: referralData.providerEmail,
            phone: referralData.providerPhone,
            child_age: referralData.clientAge,
            message: `REFERRAL SUBMISSION:
            
Provider: ${referralData.referringProvider}
Clinic: ${referralData.clinicName}
Client: ${referralData.clientName}
Age: ${referralData.clientAge}

Primary Concerns: ${referralData.primaryConcerns}
Current Services: ${referralData.currentServices || 'None specified'}
Insurance: ${referralData.insuranceInfo || 'Not provided'}
Urgency: ${referralData.urgencyLevel || 'Not specified'}

Additional Notes: ${referralData.additionalNotes || 'None'}
Preferred Contact: ${referralData.preferredContactMethod || 'Not specified'}

Client Contact:
Email: ${referralData.clientEmail || 'Not provided'}
Phone: ${referralData.clientPhone || 'Not provided'}

This is a healthcare provider referral submission.`,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (contactError) {
        console.error('Contact form fallback error:', contactError);
        return NextResponse.json(
          { error: `Database error: ${contactError.message}` },
          { status: 500 }
        );
      }

      console.log('Referral submitted via contact form fallback:', contactData);
      return NextResponse.json(
        { 
          success: true, 
          message: 'Referral submitted successfully (via contact form)',
          data: contactData[0]
        },
        { status: 201 }
      );
    }

    console.log('Table exists, proceeding with insert...');

    // Insert referral into database
    const { data, error } = await supabase
      .from('referrals')
      .insert([
        {
          referring_provider: referralData.referringProvider,
          provider_email: referralData.providerEmail,
          provider_phone: referralData.providerPhone,
          clinic_name: referralData.clinicName,
          clinic_address: referralData.clinicAddress,
          client_name: referralData.clientName,
          client_age: referralData.clientAge,
          client_email: referralData.clientEmail,
          client_phone: referralData.clientPhone,
          primary_concerns: referralData.primaryConcerns,
          current_services: referralData.currentServices,
          insurance_info: referralData.insuranceInfo,
          urgency_level: referralData.urgencyLevel,
          additional_notes: referralData.additionalNotes,
          preferred_contact_method: referralData.preferredContactMethod,
          referral_date: referralData.referralDate,
          status: 'new',
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (error) {
      console.error('Error inserting referral:', error);
      return NextResponse.json(
        { error: `Failed to submit referral: ${error.message}` },
        { status: 500 }
      );
    }

    console.log('Referral inserted successfully:', data);

    // TODO: Send email notification to Higher Ground Care team
    // TODO: Send confirmation email to referring provider

    return NextResponse.json(
      { 
        success: true, 
        message: 'Referral submitted successfully',
        data: data[0]
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error processing referral:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}

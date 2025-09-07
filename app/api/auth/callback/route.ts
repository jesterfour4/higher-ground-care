import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          },
        },
      }
    )
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && data.user) {
      // Handle profile creation/update for OAuth users
      try {
        const { data: existingProfile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', data.user.id)
          .single()

        if (!existingProfile) {
          // Create new profile for OAuth user
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email,
              first_name: data.user.user_metadata?.given_name || data.user.user_metadata?.first_name,
              last_name: data.user.user_metadata?.family_name || data.user.user_metadata?.last_name,
              email: data.user.email,
              phone: data.user.user_metadata?.phone_number,
              avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture,
              provider: data.user.app_metadata?.provider || 'google',
              provider_id: data.user.user_metadata?.provider_id || data.user.id,
            })

          if (profileError) {
            console.error('Error creating profile:', profileError)
          }
        } else {
          // Update existing profile with latest OAuth data
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email,
              first_name: data.user.user_metadata?.given_name || data.user.user_metadata?.first_name,
              last_name: data.user.user_metadata?.family_name || data.user.user_metadata?.last_name,
              email: data.user.email,
              phone: data.user.user_metadata?.phone_number,
              avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture,
              provider: data.user.app_metadata?.provider || 'google',
              provider_id: data.user.user_metadata?.provider_id || data.user.id,
              updated_at: new Date().toISOString(),
            })
            .eq('id', data.user.id)

          if (updateError) {
            console.error('Error updating profile:', updateError)
          }
        }
      } catch (profileError) {
        console.error('Error handling profile:', profileError)
        // Continue with redirect even if profile handling fails
      }

      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

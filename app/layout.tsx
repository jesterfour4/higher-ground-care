import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ContactModalProvider } from '@/components/ContactModalProvider'
import FeedbackBubble from '@/components/FeedbackBubble'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Higher Ground Care - Compassionate, Evidence-Based Care',
  description: 'Speech therapy that feels safe, welcoming, and clear. Bilingual support, low-sensory environment, and personalized care for children.',
  keywords: 'speech therapy, speech language pathology, bilingual therapy, low-sensory, neuro-affirming, trauma-informed, children, early intervention',
  authors: [{ name: 'Laura Allred, MS, CCC-SLP' }],
  creator: 'Higher Ground Care',
  publisher: 'Higher Ground Care',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Higher Ground Care',
    description: 'Speech therapy that feels safe, welcoming, and clear.',
    url: 'https://highergroundcare.com',
    siteName: 'Higher Ground Care',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/hgst-logo.png',
        width: 800,
        height: 400,
        alt: 'Higher Ground Speech Therapy Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Higher Ground Care',
    description: 'Speech therapy that feels safe, welcoming, and clear.',
    images: ['/images/hgst-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ContactModalProvider>
          {children}
          <FeedbackBubble />
        </ContactModalProvider>
      </body>
    </html>
  )
} 
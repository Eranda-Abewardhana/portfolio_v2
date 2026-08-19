import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://erandasathsara.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Eranda Sathsara Abewardhana | AI Engineer & Full-Stack Developer',
    template: '%s | Eranda Sathsara Abewardhana',
  },
  description:
    'Official Portfolio of Eranda Sathsara Abewardhana (Eranda Sathsara) — AI Engineer & Full-Stack Developer specializing in Multi-Agent AI systems, RAG pipelines, PyTorch, FastAPI, and Next.js. AI undergraduate at University of Moratuwa.',
  keywords: [
    'Eranda Sathsara Abewardhana',
    'Eranda Sathsara',
    'Eranda Abewardhana',
    'Eranda S. Abewardhana',
    'AI Engineer Sri Lanka',
    'Machine Learning Engineer Sri Lanka',
    'Multi-Agent AI Engineer',
    'RAG Systems Architect',
    'Full-Stack Developer Sri Lanka',
    'FastAPI Developer',
    'PyTorch Engineer',
    'University of Moratuwa AI',
    'YouFIRA Autonomous Vehicle',
    'Yukti Legal AI',
    'SentiView NLP',
    'Genomic Pathogenicity Prediction',
    'Panadura AI Developer',
  ],
  authors: [
    {
      name: 'Eranda Sathsara Abewardhana',
      url: siteUrl,
    },
  ],
  creator: 'Eranda Sathsara Abewardhana',
  publisher: 'Eranda Sathsara Abewardhana',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Eranda Sathsara Abewardhana | AI Engineer & Full-Stack Developer',
    description:
      'Explore the interactive 3D portfolio of Eranda Sathsara Abewardhana — AI Engineer specializing in Multi-Agent AI, RAG systems, PyTorch, FastAPI, and scalable web apps.',
    url: siteUrl,
    siteName: 'Eranda Sathsara Abewardhana Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/eranda_stairs.png',
        width: 1200,
        height: 630,
        alt: 'Eranda Sathsara Abewardhana - AI Engineer & Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eranda Sathsara Abewardhana | AI Engineer & Full-Stack Developer',
    description:
      'Interactive 3D Portfolio of Eranda Sathsara Abewardhana — AI Engineer & Full-Stack Developer.',
    images: ['/images/eranda_stairs.png'],
    creator: '@ErandaSathsara',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#07090e" />
      </head>
      <body className="bg-[#07090e] text-gray-100 antialiased selection:bg-[#e06b3a] selection:text-white">
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import CustomCursor from '@/components/ui/CustomCursor';

export const metadata: Metadata = {
  title: 'Eranda Sathsara Abewardhana | AI Engineer & Full-Stack Developer',
  description: 'Portfolio of Eranda Sathsara Abewardhana — AI Engineer & Full-Stack Developer specializing in Multi-Agent AI systems, RAG, FastAPI, PyTorch, and Next.js.',
  keywords: ['Eranda Sathsara Abewardhana', 'AI Engineer', 'Machine Learning Engineer', 'Full-Stack Developer', 'Multi-Agent AI', 'RAG', 'FastAPI', 'Next.js', 'PyTorch', 'University of Moratuwa'],
  authors: [{ name: 'Eranda Sathsara Abewardhana' }],

  openGraph: {
    title: 'Eranda Sathsara Abewardhana | AI Engineer & Full-Stack Developer',
    description: '3D Interactive Portfolio featuring AI projects, RAG architectures, and Full-Stack engineering.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#07090e] text-gray-100 antialiased selection:bg-[#e06b3a] selection:text-white">
        <CustomCursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

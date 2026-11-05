import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./portfolio.css";
import "./scroll-effects.css";
import "./profile-details.css";

const bodyFont = localFont({
  src: [
    {
      path: "../../public/fonts/dm-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/dm-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});
const displayFont = localFont({
  src: [
    {
      path: "../../public/fonts/barlow-condensed-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/barlow-condensed-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://erandasathsara.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Eranda Sathsara Abewardhana | AI Engineer & Full-Stack Developer",
    template: "%s | Eranda Sathsara Abewardhana",
  },
  description:
    "Eranda Sathsara Abewardhana — AI and Software Engineer focused on backend and platform engineering, RAG, multi-agent systems, FastAPI microservices, and cloud-native delivery. Explore DocCraft, Yukti, robotics, and genomic AI research.",
  keywords: [
    "Eranda Sathsara Abewardhana",
    "Eranda Sathsara",
    "Eranda Abewardhana",
    "Eranda S. Abewardhana",
    "Sathsara Eranda",
    "sathsara aewardhana",
    "Eranda Aewardhana",
    "Sathsara Eranda Abewardhana",
    "AI Engineer Sri Lanka",
    "Machine Learning Engineer Sri Lanka",
    "Multi-Agent AI Engineer",
    "RAG Systems Architect",
    "Full-Stack Developer Sri Lanka",
    "FastAPI Developer",
    "PyTorch Engineer",
    "University of Moratuwa AI",
    "YouFIRA Autonomous Vehicle",
    "Yukti Legal AI",
    "DocCraft AI Document Builder",
    "Backend and Platform Engineering",
    "Cloud-Native Systems",
    "SentiView NLP",
    "Genomic Pathogenicity Prediction",
    "Panadura AI Developer",
  ],
  authors: [
    {
      name: "Eranda Sathsara Abewardhana",
      url: siteUrl,
    },
  ],
  creator: "Eranda Sathsara Abewardhana",
  publisher: "Eranda Sathsara Abewardhana",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Eranda Sathsara Abewardhana | AI Engineer & Full-Stack Developer",
    description:
      "Ideas into reality. AI products, backend and platform engineering, cloud-native systems, and research by Eranda Sathsara Abewardhana.",
    url: siteUrl,
    siteName: "Eranda Sathsara Abewardhana Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/optimized/social-card.jpg",
        width: 1200,
        height: 630,
        alt: "Eranda Sathsara Abewardhana - AI Engineer & Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eranda Sathsara Abewardhana | AI Engineer & Full-Stack Developer",
    description:
      "AI engineering, thoughtful software, and real-world impact. Selected work by Eranda Sathsara Abewardhana.",
    images: ["/images/optimized/social-card.jpg"],
    creator: "@ErandaSathsara",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <head>
        <meta name="theme-color" content="#11100e" />
      </head>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, Playfair_Display, Space_Mono } from 'next/font/google';
import './globals.css';
import { OG_IMAGE_URL } from '@/lib/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'http://localhost:3000';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '700'],
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '¿Cuál es tu nivel de adopción de IA? | Accionables',
  description:
    'Descubre tu nivel real de adopción de inteligencia artificial en el trabajo. Quiz gratuito en español e inglés.',
  openGraph: {
    title: 'AI Adoption Level Quiz | Accionables',
    description:
      'Find out your real AI adoption level at work. Free quiz available in Spanish and English.',
    images: [{ url: OG_IMAGE_URL }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-neutral-900">{children}</body>
    </html>
  );
}

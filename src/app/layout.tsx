import type { Metadata } from 'next';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import './globals.css';

const displayFont = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
});

const monoFont = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'OfferPilot · AI 大厂面试官',
  description: '模拟阿里/字节/腾讯/美团真实技术面试，实时追问与评分报告。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" data-theme="dark">
      <body className={`${displayFont.variable} ${monoFont.variable} antialiased`}>
        <div className="min-h-screen bg-app-bg text-app-text">
          <Header />
          <main className="w-full px-4 py-6">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

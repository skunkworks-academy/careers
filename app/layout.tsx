import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const academyLogo = 'https://raw.githubusercontent.com/skunkworks-academy/www/refs/heads/main/images/favicon-black.png';
const academyLogoDark = 'https://raw.githubusercontent.com/skunkworks-academy/www/refs/heads/main/images/favicon-white.png';
const academyShell = 'https://skunkworksacademy.com/assets/academy-navigation.js?v=2026.08.15.1';

export const metadata: Metadata = {
  title: 'Skunkworks Academy Careers',
  description: 'Career assessment, consultation and personalised learning pathways.',
  icons: {
    icon: [
      { url: academyLogo, type: 'image/png', media: '(prefers-color-scheme: light)' },
      { url: academyLogoDark, type: 'image/png', media: '(prefers-color-scheme: dark)' },
    ],
    shortcut: academyLogo,
    apple: academyLogo,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body>
        {children}
        <Script src={academyShell} strategy="afterInteractive" data-skunkworks-global-nav="v10" />
      </body>
    </html>
  );
}

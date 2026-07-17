import type { Metadata } from 'next';
import './globals.css';

const academyLogo = 'https://raw.githubusercontent.com/skunkworks-academy/www/refs/heads/main/images/favicon-black.png';
const academyLogoDark = 'https://raw.githubusercontent.com/skunkworks-academy/www/refs/heads/main/images/favicon-white.png';

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
      <body>{children}</body>
    </html>
  );
}

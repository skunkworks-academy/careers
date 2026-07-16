import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Skunkworks Academy Careers',
  description: 'Career assessment, consultation and personalised learning pathways.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body>{children}</body>
    </html>
  );
}

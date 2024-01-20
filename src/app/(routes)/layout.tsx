import type { Metadata } from 'next';
import { Noto_Sans_Thai } from 'next/font/google';
import '../globals.css';

const noto_sans_thai = Noto_Sans_Thai({ subsets: ['thai'] });

export const metadata: Metadata = {
  title: 'Agnos Frontend Interview',
  description: 'This is web application for frontend interview at Agnos.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto_sans_thai.className} style={{ userSelect: 'none' }}>
        {children}
      </body>
    </html>
  );
}

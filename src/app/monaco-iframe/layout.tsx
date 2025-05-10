import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Monaco Editor',
  description: 'Monaco Editor for BlockFirst',
};

export default function MonacoIframeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#0F1217]`}
        style={{ margin: 0, padding: 0, overflow: 'hidden', height: '100vh' }}
      >
        {children}
      </body>
    </html>
  );
}

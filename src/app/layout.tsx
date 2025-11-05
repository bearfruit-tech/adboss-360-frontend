import './global.css';
import { Mulish } from 'next/font/google';
import SonnerProvider from '@/app/SonnerProvider';

export const metadata = {
  title: "Welcome to AB360",
  description: "Your agency's complete marketing ecosystem.",
};

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='bg-light-gray'>
      <body className={`antialiased ${mulish.variable} font-sans`}>{children}
      <SonnerProvider />
      </body>
    </html>
  );
}

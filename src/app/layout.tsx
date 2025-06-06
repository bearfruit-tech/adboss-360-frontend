import './global.css';
import { Lexend } from 'next/font/google';
import SonnerProvider from '@/app/SonnerProvider';

export const metadata = {
  title: "Welcome to AB360",
  description: "Your agency's complete marketing ecosystem.",
};

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='bg-light-gray'>
      <body className={`antialised ${lexend.variable}`}>{children}
      <SonnerProvider />
      </body>
    </html>
  );
}

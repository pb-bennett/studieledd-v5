'use client';
import './globals.css';
import { Rubik } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

// Components
import Navbar from './components/Navbar';

const rubik = Rubik({ subsets: ['latin'] });

// export const metadata = {
//   title: 'StudieLedd',
//   description: 'Connecting dremote based students.',
// };

export default function RootLayout({ children }) {
  console.log('APIURL:', process.env.API);
  return (
    <html lang="en">
      <body className={rubik.className}>
        <SessionProvider>
          <Toaster />
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css'
import { UserDatabseProvider } from '../context/userContext';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = { 
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider
        loginUrl='/home'
      >
        <UserDatabseProvider>
          <body className={inter.className}>
            {children}  
          </body>
        </UserDatabseProvider>
      </UserProvider>
    </html>
  )
}

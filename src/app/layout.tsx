import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/navbar/navbar'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rest-Countries',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className="dark:bg-darkBg">
        <Providers>
          <Navbar  />
          <hr className="h-px my-1 bg-black border-2 dark:bg-gray-700"></hr>
          {children}
        </Providers>
      </body>
    </html>
  )
}

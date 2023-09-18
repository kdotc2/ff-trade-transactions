import '@css/tailwind.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`bg-[#fdfdfd] antialiased dark:bg-[#0e0d0d] dark:text-gray-100 ${inter.className}`}
      >
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}

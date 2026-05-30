import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Víctor Sebastián Scatturice',
  description: 'Estratega Gastronómico & Chef Ejecutivo con más de 20 años de experiencia.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  }
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
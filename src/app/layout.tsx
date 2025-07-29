import '../styles/globals.css'
import { Orbitron } from 'next/font/google'
import { AuthProvider } from '@/components/AuthProvider'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-principal',
})

export const metadata = {
  title: 'CassinoTrack',
  description: 'Dados de jogos em tempo real',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${orbitron.variable} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
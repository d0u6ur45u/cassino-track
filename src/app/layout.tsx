import '../styles/globals.css'
import { Orbitron } from 'next/font/google'

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
    <html lang="pt-BR">
      <body className={`${orbitron.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
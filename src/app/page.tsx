'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import GameCard from '@/components/GameCard'
import { useAuth } from '@/components/AuthProvider'
import Link from 'next/link'

const MOCK_DATA = [
  { nome: 'Roleta Evolution', resultados: ['12', '8', '0', '33', '21'] },
  { nome: 'Bac Bo Ao Vivo', resultados: ['Player', 'Banker', 'Tie'] },
  { nome: 'Dragon Tiger', resultados: ['Dragon', 'Tiger', 'Tie'] },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6">
        <h2 className="text-2xl font-bold mb-4">Últimos resultados</h2>

        {!user && (
          <div className="bg-yellow-500 text-black p-3 rounded-md mb-6 font-semibold">
            <p>
              Faça <Link href="/login" className="underline">login</Link> para ver o histórico completo.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4">
          {MOCK_DATA.map((jogo, index) => (
            <GameCard key={index} nome={jogo.nome} resultados={jogo.resultados} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
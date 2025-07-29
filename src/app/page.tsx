'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/components/AuthProvider'
import Image from 'next/image'

type Game = {
  id: string
  name: string
  results: any[]
  imagePath: string
  provider: string
}

const API_URLS = [
  {
    provider: 'Evolution',
    folder: 'evolution'
  },
  {
    provider: 'Evolution',
    folder: 'evolution/games'
  },
  {
    provider: 'Evolution',
    folder: 'evolution/games'
  },
  {
    provider: 'Evolution',
    folder: 'evolution/games'
  },
  {
    provider: 'Evolution',
    folder: 'evolution/games'
  },
  {
    provider: 'Evolution',
    folder: 'evolution/games'
  },
  {
    provider: 'Pragmatic',
    folder: 'pragmatic/roulette'
  },
  {
    provider: 'Pragmatic',
    folder: 'pragmatic/cards'
  },
  {
    provider: 'Pragmatic',
    folder: 'pragmatic/spaceman'
  },
  {
    provider: 'Playtech',
    folder: 'playtech'
  }
]

const generateImagePath = (providerFolder: string, gameName: string): string => {
  const formattedName = gameName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/_/g, '-')
    .replace(/_win$/, '')

  return `/assets/${providerFolder}/${formattedName}.png`
}

function formatResult(gameName: string, result: any): string {
  if (typeof result === 'string') {
    return result.replace(/_win$/i, '')
  }

  if (typeof result?.result === 'string') {
    return result.result
  }

  if (result?.number) {
    return result.number
  }

  if (result?.winningNumber && result?.gameResult) {
    return result.gameResult
  }

  if (result?.winner) {
    return result.winner.replace(/_win$/i, '')
  }

  if (result?.player || result?.banker || result?.tie) {
    const player = result.player ? result.player.replace(/_win$/i, '') : ''
    const banker = result.banker ? result.banker.replace(/_win$/i, '') : ''
    const tie = result.tie ? result.tie.replace(/_win$/i, '') : ''

    return [
      player ? `P:${player}` : '',
      banker ? `B:${banker}` : '',
      tie ? `T:${tie}` : ''
    ].filter(Boolean).join(' ')
  }

  if (result?.home || result?.away) {
    return [
      result.home ? `H:${result.home}` : '',
      result.away ? `A:${result.away}` : ''
    ].filter(Boolean).join(' ')
  }

  return JSON.stringify(result)
}

export default function Home() {
  const { user } = useAuth()
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const res = await fetch('/api/games')
      const json = await res.json()
      const responses = Array.isArray(json.responses) ? json.responses : []

      const updatedGames: Game[] = []

      responses.forEach((providerData: any, index: number) => {
        const api = API_URLS[index]
        if (!providerData || !api) return

        const gameKeys = Object.keys(providerData)
        if (gameKeys.length === 0) return


        const firstGameKey = gameKeys[0]
        const gameName = firstGameKey.replace(/_/g, ' ')
        let rawResults = providerData[firstGameKey]

        if (rawResults?.results && Array.isArray(rawResults.results)) {
          rawResults = rawResults.results
        }

        const results = Array.isArray(rawResults)
          ? rawResults.slice(0, 10).map((item: any) => {
            if (Array.isArray(item) && item[0]?.number) return item[0]
            return item
          })
          : []

        updatedGames.push({
          id: `${api.provider}_${firstGameKey}`,
          name: gameName,
          results,
          imagePath: generateImagePath(api.folder, gameName),
          provider: api.provider
        })
      })

      setGames(updatedGames)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">Últimos Resultados</h1>

        {!user && (
          <div className="bg-yellow-500 text-black p-3 rounded-lg mb-6">
            <Link href="/login" className="font-semibold underline">
              Faça login
            </Link> para ver o histórico completo.
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
              >
                <div className="h-48 bg-gray-700 flex items-center justify-center relative">
                  <Image
                    src={game.imagePath}
                    alt={game.name}
                    width={200}
                    height={200}
                    className="object-contain"
                    onError={(e) => {

                      const parent = (e.target as HTMLElement).parentElement
                      if (parent) {
                        parent.innerHTML = `<span class="text-gray-400">${game.name}</span>`
                      }
                    }}
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold truncate">{game.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{game.provider}</p>

                  <div className="flex flex-wrap gap-2">
                    {game.results.map((result, index) => (
                      <span
                        key={index}
                        className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold"
                      >
                        {formatResult(game.name, result)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/components/AuthProvider'
import Image from 'next/image'

const API_URLS = [
  { provider: 'Evolution', folder: 'evolution' },
  { provider: 'Evolution', folder: 'evolution/games' },
  { provider: 'Evolution', folder: 'evolution/games' },
  { provider: 'Evolution', folder: 'evolution/games' },
  { provider: 'Evolution', folder: 'evolution/games' },
  { provider: 'Evolution', folder: 'evolution/games' },
  { provider: 'Pragmatic', folder: 'pragmatic/roulette' },
  { provider: 'Pragmatic', folder: 'pragmatic/cards' },
  { provider: 'Pragmatic', folder: 'pragmatic/spaceman' },
  { provider: 'Playtech', folder: 'playtech' }
]

type Game = {
  id: string
  name: string
  imagePath: string
  provider: string
  results: any[]
}

function mapNumberToLetter(number: number | string): string {
  const num = Number(number)
  const map: Record<number, string> = {
    14: 'A',
    13: 'K',
    12: 'Q',
    11: 'J'
  }
  return String(map[num] || num)
}

function getColorStyle(gameName: string, result: any): { bg: string; text: string; label: string; rounded?: string } {
  const name = gameName.toLowerCase()
  const base = { bg: 'bg-yellow-500', text: 'text-black', label: String(formatResult(gameName, result)) }

  if (name.includes('roulette') || name.includes('roleta')) {
    const num = Number(formatResult(gameName, result))
    const red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
    const black = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]

    if (num === 0) return { bg: 'bg-green-600', text: 'text-white', label: '0' }
    if (red.includes(num)) return { bg: 'bg-red-600', text: 'text-white', label: String(num) }
    if (black.includes(num)) return { bg: 'bg-black', text: 'text-white', label: String(num) }
  }

  if (name.includes('football studio') || name.includes('futebol studio') || name.includes('futbol studio')) {
    let label = ''
    let bg = ''
    let text = 'text-white'
    const rounded = 'rounded-full w-6 h-6 flex items-center justify-center text-xs'

    const winner = result?.winner?.toLowerCase()
    const score =
      winner === 'tie'
        ? result?.home?.score || result?.away?.score || ''
        : result?.[winner]?.score || ''

    label = winner === 'tie' ? mapNumberToLetter(score) : mapNumberToLetter(score)

    if (winner === 'tie' && name.includes('futbol studio')) {
      return { bg: 'bg-gray-500', text: 'text-white', label, rounded }
    }
    if (winner === 'tie') {
      return { bg: 'bg-yellow-400', text: 'text-black', label, rounded }
    }

    if (name.includes('futbol studio')) {
      if (winner === 'away') bg = 'bg-blue-600'
      if (winner === 'home') bg = 'bg-yellow-500'
    } else if (name.includes('futebol studio ao vivo')) {
      if (winner === 'away') bg = 'bg-blue-600'
      if (winner === 'home') bg = 'bg-green-800'
    } else if (name.includes('football studio')) {
      if (winner === 'away') bg = 'bg-blue-600'
      if (winner === 'home') bg = 'bg-red-600'
    }

    return { bg, text, label, rounded }
  }

  if (name.includes('bac bo') || name.includes('bac bo ao vivo')) {
    const winner = result?.winner?.toLowerCase();
    const score = result?.Score;
    if (!winner || score === undefined) return base;

    const label = winner === 'tie' ? mapNumberToLetter(score) : String(score);
    const rounded = 'rounded-full w-6 h-6 flex items-center justify-center text-xs';

    if (winner === 'banker') return { bg: 'bg-red-600', text: 'text-white', label, rounded };
    if (winner === 'player') return { bg: 'bg-blue-600', text: 'text-white', label, rounded };
    if (winner === 'tie') return { bg: 'bg-yellow-400', text: 'text-black', label, rounded };
  }

  if (name.includes('baccarat') || name.includes('bacar')) {
    const rounded = 'rounded-full w-6 h-6 flex items-center justify-center text-xs';
    const winner = result?.winner?.toLowerCase();

    if (winner === 'banker_win' || result?.banker) {
      return { bg: 'bg-blue-600', text: 'text-white', label: 'B', rounded };
    }
    if (winner === 'player_win' || result?.player) {
      return { bg: 'bg-red-600', text: 'text-white', label: 'P', rounded };
    }
    if (winner === 'tie' || result?.tie) {
      return { bg: 'bg-green-500', text: 'text-white', label: 'T', rounded };
    }
  }

  if (name.includes('spaceman')) {
    const val = parseFloat(formatResult(gameName, result))
    const label = `${val.toFixed(2)}x`
    if (val <= 1.0) return { bg: 'bg-[#5E6A71]', text: 'text-white', label }
    if (val > 1.0 && val < 2.0) return { bg: 'bg-[#007cc3]', text: 'text-white', label }
    if (val >= 2.0 && val < 6.0) return { bg: 'bg-[#4201CB]', text: 'text-white', label }
    if (val >= 6.0 && val < 20.0) return { bg: 'bg-[#59009e]', text: 'text-white', label }
    if (val >= 20.0) return { bg: 'bg-[#9D01C8]', text: 'text-white', label }
  }

  return base
}

function formatResult(gameName: string, result: any): string {
  if (typeof result === 'string') return result.replace(/_win$/i, '')
  if (typeof result?.result === 'string') return result.result
  if (result?.number) return String(result.number)
  if (result?.winningNumber && result?.gameResult) return String(result.gameResult)
  if (result?.winner) return result.winner.replace(/_win$/i, '')

  if (result?.player || result?.banker || result?.tie) {
    const player = result.player ? result.player.replace(/_win$/i, '') : ''
    const banker = result.banker ? result.banker.replace(/_win$/i, '') : ''
    const tie = result.tie ? result.tie.replace(/_win$/i, '') : ''
    return [player && `P:${player}`, banker && `B:${banker}`, tie && `T:${tie}`].filter(Boolean).join(' ')
  }

  if (result?.home || result?.away) {
    return [result.home && `H:${result.home}`, result.away && `A:${result.away}`].filter(Boolean).join(' ')
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
        if (!gameKeys.length) return

        const firstGameKey = gameKeys[0]
        const gameName = firstGameKey.replace(/_/g, ' ')
        let rawResults = providerData[firstGameKey]

        if (rawResults?.results && Array.isArray(rawResults.results)) {
          rawResults = rawResults.results
        }

        const results = Array.isArray(rawResults)
          ? rawResults.slice(0, 10).map((item: any) => Array.isArray(item) && item[0]?.number ? item[0] : item)
          : []

        updatedGames.push({
          id: `${api.provider}_${firstGameKey}`,
          name: gameName,
          results,
          imagePath: `/assets/${api.folder}/${gameName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.png`,
          provider: api.provider
        })
      })

      setGames(updatedGames)
    } catch (e) {
      console.error(e)
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
            </Link> para mais jogos.
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <div key={game.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
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
                        parent.innerHTML = `<span class='text-gray-400'>${game.name}</span>`
                      }
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold truncate">{game.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{game.provider}</p>

                  <div className="flex flex-wrap gap-2">
                    {game.results.map((result: any, index: number) => {
                      const style = getColorStyle(game.name, result)
                      return (
                        <span
                          key={index}
                          className={`px-2 py-1 text-xs font-bold ${style.bg} ${style.text} ${style.rounded || 'rounded'}`}
                        >
                          {style.label}
                        </span>
                      )
                    })}
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
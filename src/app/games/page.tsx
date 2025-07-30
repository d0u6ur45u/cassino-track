'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useAuth } from '@/components/AuthProvider'
import Image from 'next/image'
import clsx from 'clsx'

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
}

let cachedGames: Game[] = []
let lastFetchTime = 0
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24h

function normalize(str: string): string {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
}

export default function GamesPage() {
    const { user, loading: authLoading } = useAuth()
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [filtro, setFiltro] = useState<'todos' | 'roleta' | 'bacara' | 'ao-vivo' | 'crash'>('todos')

    const fetchAllGames = async () => {
        if (Date.now() - lastFetchTime < CACHE_DURATION && cachedGames.length > 0) {
            setGames(cachedGames)
            setLoading(false)
            return
        }

        try {
            const res = await fetch('/api/games')
            const json = await res.json()
            const responses: any[] = Array.isArray(json.responses) ? json.responses : []

            const allGames: Game[] = []

            responses.forEach((providerData, index) => {
                const api = API_URLS[index]
                if (!providerData || !api) return

                Object.keys(providerData).forEach((gameKey) => {
                    const gameName = gameKey.replace(/_/g, ' ')
                    allGames.push({
                        id: `${api.provider}_${gameKey}`,
                        name: gameName,
                        imagePath: `/assets/${api.folder}/${gameName
                            .toLowerCase()
                            .replace(/\s+/g, '-')
                            .replace(/[^a-z0-9-]/g, '')}.png`,
                        provider: api.provider
                    })
                })
            })

            cachedGames = allGames
            lastFetchTime = Date.now()
            setGames(allGames)
        } catch (error) {
            console.error('Erro ao buscar jogos:', error)
            if (cachedGames.length > 0) setGames(cachedGames)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!authLoading && user) {
            fetchAllGames()
        } else if (!authLoading && !user) {
            setLoading(false)
        }
    }, [authLoading, user])

    const jogosFiltrados = games
        .filter((game) => {
            const name = normalize(game.name)

            const isRoleta = name.includes('roleta') || name.includes('roulette') || name.includes('ruleta')
            const isBacara = name.includes('bacara') || name.includes('baccarat')
            const isCrash = name.includes('spaceman')

            if (filtro === 'roleta') return isRoleta
            if (filtro === 'bacara') return isBacara
            if (filtro === 'crash') return isCrash
            if (filtro === 'ao-vivo') return !isRoleta && !isBacara && !isCrash
            if (filtro === 'todos') return true

            return true
        })
        .sort((a, b) => a.name.localeCompare(b.name))

    if (authLoading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />

            <main className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-yellow-400">Jogos Disponíveis</h1>

                {!user ? (
                    <div className="bg-yellow-500 text-black p-3 rounded-lg mb-6">
                        <p className="font-semibold">Você precisa estar logado para ver os jogos.</p>
                        <Link href="/login" className="underline font-bold">Ir para login</Link>
                    </div>
                ) : (
                    <>
                        <div className="flex gap-4 mb-6 flex-wrap">
                            <button
                                onClick={() => setFiltro('todos')}
                                className={clsx(
                                    'px-4 py-2 rounded-lg font-bold transition',
                                    filtro === 'todos'
                                        ? 'bg-yellow-400 text-black'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                )}
                            >
                                Todos
                            </button>

                            <button
                                onClick={() => setFiltro('bacara')}
                                className={clsx(
                                    'px-4 py-2 rounded-lg font-bold transition',
                                    filtro === 'bacara'
                                        ? 'bg-yellow-400 text-black'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                )}
                            >
                                Bacará
                            </button>

                            <button
                                onClick={() => setFiltro('crash')}
                                className={clsx(
                                    'px-4 py-2 rounded-lg font-bold transition',
                                    filtro === 'crash'
                                        ? 'bg-yellow-400 text-black'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                )}
                            >
                                Crash
                            </button>

                            <button
                                onClick={() => setFiltro('ao-vivo')}
                                className={clsx(
                                    'px-4 py-2 rounded-lg font-bold transition',
                                    filtro === 'ao-vivo'
                                        ? 'bg-yellow-400 text-black'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                )}
                            >
                                Jogos ao Vivo
                            </button>

                            <button
                                onClick={() => setFiltro('roleta')}
                                className={clsx(
                                    'px-4 py-2 rounded-lg font-bold transition',
                                    filtro === 'roleta'
                                        ? 'bg-yellow-400 text-black'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                )}
                            >
                                Roletas
                            </button>
                        </div>

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {jogosFiltrados.map((game) => (
                                    <Link
                                        href={`/games/${game.id}`}
                                        key={game.id}
                                        className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transition-all"
                                    >
                                        <div className="h-48 bg-gray-700 flex items-center justify-center relative">
                                            <Image
                                                src={game.imagePath}
                                                alt={game.name}
                                                width={200}
                                                height={200}
                                                className="object-contain"
                                                priority
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement
                                                    target.onerror = null
                                                    target.src = '/fallback.png'
                                                }}
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-lg font-bold truncate">{game.name}</h3>
                                            <p className="text-sm text-gray-400">{game.provider}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    )
}

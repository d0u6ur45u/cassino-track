import { NextResponse } from 'next/server'

const API_URLS = [
    {
        url: 'https://casino.dougurasu-bets.online:9000/evolution/results.json',
        provider: 'Evolution',
        folder: 'evolution'
    },
    {
        url: 'https://casino.dougurasu-bets.online:9000/providers/evolution/games/football-studio/results.json',
        provider: 'Evolution',
        folder: 'evolution/games'
    },
    {
        url: 'https://casino.dougurasu-bets.online:9000/providers/evolution/games/futebol-studio-ao-vivo/results.json',
        provider: 'Evolution',
        folder: 'evolution/games'
    },
    {
        url: 'https://casino.dougurasu-bets.online:9000/providers/evolution/games/futbol-studio/results.json',
        provider: 'Evolution',
        folder: 'evolution/games'
    },
    {
        url: 'https://casino.dougurasu-bets.online:9000/providers/evolution/games/bacbo/results.json',
        provider: 'Evolution',
        folder: 'evolution/games'
    },
    {
        url: 'https://casino.dougurasu-bets.online:9000/providers/evolution/games/bacbo-ao-vivo/results.json',
        provider: 'Evolution',
        folder: 'evolution/games'
    },
    {
        url: 'https://casino.dougurasu-bets.online:9000/pragmatic/roulette/results.json',
        provider: 'Pragmatic',
        folder: 'pragmatic/roulette'
    },
    {
        url: 'https://casino.dougurasu-bets.online:9000/pragmatic/cards/results.json',
        provider: 'Pragmatic',
        folder: 'pragmatic/cards'
    },
    {
        url: 'https://casino.dougurasu-bets.online:9000/pragmatic/spaceman/results.json',
        provider: 'Pragmatic',
        folder: 'pragmatic/spaceman'
    },
    {
        url: 'https://casino.dougurasu-bets.online:9000/playtech/results.json',
        provider: 'Playtech',
        folder: 'playtech'
    }
]

export async function GET() {
    try {
        const responses = await Promise.all(
            API_URLS.map(api =>
                fetch(api.url)
                    .then(res => res.ok ? res.json() : null)
                    .catch(() => null)
            )
        )

        return NextResponse.json({ responses })
    } catch (error) {
        return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
    }
}
'use client'

import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function games() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading])

    if (!user) return null

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <h1 className="text-2xl font-bold text-yellow-400 mb-4">Histórico completo de games</h1>
            {/* Aqui vai a listagem real via API */}
        </div>
    )
}
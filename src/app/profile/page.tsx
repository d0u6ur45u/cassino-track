'use client'

import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function profile() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading])

    if (loading || !user) return null

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <h1 className="text-2xl font-bold text-yellow-400 mb-6">Seu profile</h1>

            <div className="bg-zinc-900 p-4 rounded-lg w-full max-w-md space-y-4">
                <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-semibold">{user.email}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">ID do usuário</p>
                    <p className="text-white font-mono text-sm break-all">{user.uid}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-400">Conta criada em</p>
                    <p className="text-white font-semibold">
                        {user.metadata.creationTime
                            ? new Date(user.metadata.creationTime).toLocaleString('pt-BR')
                            : 'Desconhecido'}
                    </p>
                </div>

                {/* Você pode expandir aqui depois com plano, CPF etc, puxando do Firestore */}
            </div>
        </div>
    )
}
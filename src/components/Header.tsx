'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { LogOut, User2 } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
    const { user } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        await signOut(auth)
        router.push('/')
    }

    return (
        <header className="bg-black text-[#FFD700] flex justify-between items-center px-6 py-4 border-b border-[#FFD700]/10">
            {/* Logo (mantido na esquerda) */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                <Image
                    src="/assets/cassino-track-logo.png"
                    alt="CassinoTrack Logo"
                    width={160}
                    height={160}
                    className="h-15 w-auto"
                />
                <span className="text-2xl font-bold tracking-widest hover:text-white transition hidden sm:block">
                    CassinoTrack
                </span>
            </Link>

            {/* Links de navegação (lado direito) */}
            <div className="flex items-center gap-6">
                {user ? (
                    <div className="relative flex items-center gap-6">
                        {/* Links visíveis quando logado */}
                        <nav className="hidden md:flex items-center gap-6">
                            {pathname !== '/' && (
                                <Link
                                    href="/"
                                    className="text-yellow-400 hover:text-white transition py-2 px-1 border-b-2 border-transparent hover:border-yellow-400"
                                >
                                    Home
                                </Link>
                            )}
                            <Link
                                href="/plans"
                                className="text-yellow-400 hover:text-white transition py-2 px-1 border-b-2 border-transparent hover:border-yellow-400"
                            >
                                Planos
                            </Link>
                        </nav>

                        {/* Botão da conta */}
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-xl hover:bg-[#333] transition"
                        >
                            <User2 size={20} />
                            <span className="hidden sm:block">Conta</span>
                        </button>

                        {/* Dropdown menu */}
                        {open && (
                            <div className="absolute right-0 top-full mt-2 bg-[#1a1a1a] shadow-lg rounded-lg w-44 text-sm border border-[#FFD700]/20 z-50">
                                {/* ... mantém o conteúdo do dropdown existente ... */}
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {/* Links visíveis quando não logado */}
                        <nav className="hidden md:flex items-center gap-6">
                            {pathname !== '/' && (
                                <Link
                                    href="/"
                                    className="text-yellow-400 hover:text-white transition py-2 px-1 border-b-2 border-transparent hover:border-yellow-400"
                                >
                                    Home
                                </Link>
                            )}
                            <Link
                                href="/plans"
                                className="text-yellow-400 hover:text-white transition py-2 px-1 border-b-2 border-transparent hover:border-yellow-400"
                            >
                                Planos
                            </Link>
                        </nav>

                        {/* Botão de Login */}
                        <Link
                            href="/login"
                            className="bg-[#C00000] text-white font-bold px-4 py-2 rounded-xl hover:bg-[#FFD700] hover:text-black transition"
                        >
                            Login
                        </Link>
                    </>
                )}
            </div>
        </header>
    )
}
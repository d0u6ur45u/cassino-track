'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { LogOut, User2 } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

export default function Header() {
    const { user } = useAuth()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        await signOut(auth)
        router.push('/')
    }

    return (
        <header className="bg-black text-[#FFD700] flex justify-between items-center px-6 py-4 border-b border-[#FFD700]/10">
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

            {user ? (
                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-xl hover:bg-[#333] transition"
                    >
                        <User2 size={20} />
                        <span className="hidden sm:block">Conta</span>
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 bg-[#1a1a1a] shadow-lg rounded-lg w-44 text-sm border border-[#FFD700]/20 z-50">
                            <Link
                                href="/perfil"
                                className="block px-4 py-2 hover:bg-[#2a2a2a]"
                                onClick={() => setOpen(false)}
                            >
                                Perfil
                            </Link>
                            <Link
                                href="/planos"
                                className="block px-4 py-2 hover:bg-[#2a2a2a]"
                                onClick={() => setOpen(false)}
                            >
                                Planos
                            </Link>
                            <Link
                                href="https://instagram.com/seu_perfil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 hover:bg-[#2a2a2a]"
                                onClick={() => setOpen(false)}
                            >
                                Instagram
                            </Link>
                            <Link
                                href="https://t.me/seu_canal"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-2 hover:bg-[#2a2a2a]"
                                onClick={() => setOpen(false)}
                            >
                                Telegram
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 hover:bg-[#2a2a2a] text-red-400"
                            >
                                <LogOut size={16} className="inline mr-1" />
                                Sair
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex gap-4">
                    <Link
                        href="/planos"
                        className="text-yellow-400 hover:text-white transition"
                    >
                        Planos
                    </Link>
                    <Link
                        href="/login"
                        className="bg-[#C00000] text-white font-bold px-4 py-2 rounded-xl hover:bg-[#FFD700] hover:text-black transition"
                    >
                        Login
                    </Link>
                </div>
            )}
        </header>
    )
}
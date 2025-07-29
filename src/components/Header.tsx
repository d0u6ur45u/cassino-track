'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { LogOut, User2, Settings, Send } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import path from 'path'

type HeaderProps = {
    showAuth?: boolean
}

export default function Header({ showAuth = true }: HeaderProps) {
    const { user, logout } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    return (
        <header className="bg-black text-[#FFD700] flex justify-between items-center px-6 py-4 border-b border-[#FFD700]/10">
            {/* Logo (mantido na esquerda) */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
                <Image
                    src="/assets/logo.png"
                    alt="CassinoTrack Logo"
                    width={160}
                    height={160}
                    className="h-20 w-auto"
                />
                <span className="text-2xl font-bold tracking-widest hover:text-white transition hidden sm:block">
                    CassinoTrack
                </span>
            </Link>

            {/* Links de navegação (lado direito) */}
            {showAuth && (
                <div className="flex items-center gap-6">
                    {user ? (
                        <div className="relative">
                            <nav className="hidden md:flex items-center gap-6">
                                {pathname !== '/' && pathname !== '/games' && (
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
                                className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-xl hover:bg-[#333] transition ml-6"
                            >
                                <User2 size={20} />
                                <span className="hidden sm:block">Conta</span>
                            </button>

                            {/* Dropdown menu */}
                            {open && (
                                <div className="absolute right-0 mt-2 bg-[#1a1a1a] shadow-lg rounded-lg w-44 text-sm border border-[#FFD700]/20 z-50">
                                    <div className="py-1">
                                        <Link
                                            href="/profile"
                                            className="flex items-center px-4 py-2 text-white hover:bg-[#2a2a2a]"
                                            onClick={() => setOpen(false)}
                                        >
                                            <User2 className="w-4 h-4 mr-2" />
                                            Perfil
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="flex items-center px-4 py-2 text-white hover:bg-[#2a2a2a]"
                                            onClick={() => setOpen(false)}
                                        >
                                            <Settings className="w-4 h-4 mr-2" />
                                            Configurações
                                        </Link>
                                        <Link
                                            href="https://t.me/seucanal"
                                            target="_blank"
                                            className="flex items-center px-4 py-2 text-white hover:bg-[#2a2a2a]"
                                            onClick={() => setOpen(false)}
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            Telegram
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout()
                                                setOpen(false)
                                            }}
                                            className="flex items-center w-full px-4 py-2 text-red-400 hover:bg-red-600 hover:text-white"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sair
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <nav className="hidden md:flex items-center gap-6">
                                {pathname !== '/' && pathname !== '/games' && (
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

                            <Link
                                href="/login"
                                className="bg-[#C00000] text-white font-bold px-4 py-2 rounded-xl hover:bg-[#FFD700] hover:text-black transition"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    )
}
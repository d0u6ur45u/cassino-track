'use client'

import { ReactNode, useEffect, useState, createContext, useContext } from 'react'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'

type AuthContextType = {
    user: User | null
    loading: boolean
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: () => { }
})

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser ?? null)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const logout = () => {
        signOut(auth)
            .then(() => setUser(null))
            .catch((error) => console.error('Erro ao sair:', error))
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
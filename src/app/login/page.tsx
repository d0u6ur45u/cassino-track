'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'
import { auth, db } from '@/lib/firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import {
    doc,
    setDoc,
    getDoc,
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore'
import Alert from '@/components/Alert'
import { traduzirErroFirebase } from '@/lib/errosFirebase'

export default function Login() {
    const { user } = useAuth()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [nome, setNome] = useState('')
    const [cpf, setCpf] = useState('')
    const [modoCadastro, setModoCadastro] = useState(true)
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [erro, setErro] = useState('')
    const [sucesso, setSucesso] = useState('')

    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/

    const formatarCpf = (valor: string) => {
        return valor
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }

    if (user) {
        router.push('/games')
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErro('')

        try {
            if (modoCadastro) {
                if (!cpfRegex.test(cpf)) {
                    setErro('CPF inválido. Use o formato 000.000.000-00.')
                    return
                }

                if (senha !== confirmarSenha) {
                    setErro('As senhas não conferem.')
                    return
                }

                const cpfQuery = query(collection(db, 'users'), where('cpf', '==', cpf))
                const cpfResult = await getDocs(cpfQuery)

                if (!cpfResult.empty) {
                    setErro('CPF já cadastrado.')
                    return
                }

                const cred = await createUserWithEmailAndPassword(auth, email, senha)
                const uid = cred.user.uid

                await setDoc(doc(db, 'users', uid), {
                    uid,
                    email,
                    nome,
                    cpf,
                    plano: 'free',
                    dataCadastro: new Date().toISOString()
                })

            } else {
                const cred = await signInWithEmailAndPassword(auth, email, senha)
                const uid = cred.user.uid

                const docRef = doc(db, 'users', uid)
                const docSnap = await getDoc(docRef)

                if (!docSnap.exists()) {
                    setErro('Usuário autenticado, mas não encontrado na base.')
                    return
                }
            }

            router.push('/games')

        } catch (err: any) {
            const codigo = err.code || ''
            setErro(traduzirErroFirebase(codigo))
        }
    }

    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-zinc-900 p-6 rounded-xl w-full max-w-sm space-y-3"
            >
                <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    {modoCadastro ? 'Criar conta' : 'Entrar'}
                </h2>

                {erro && <Alert tipo="erro" mensagem={erro} />}
                {sucesso && <Alert tipo="sucesso" mensagem={sucesso} />}

                {modoCadastro && (
                    <>
                        <input
                            type="text"
                            placeholder="Nome completo"
                            className="w-full p-2 rounded bg-zinc-800 text-white"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="CPF"
                            className="w-full p-2 rounded bg-zinc-800 text-white"
                            value={cpf}
                            onChange={(e) => setCpf(formatarCpf(e.target.value))}
                            required
                        />
                    </>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 rounded bg-zinc-800 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                {/* Campo de senha */}
                <div className="relative">
                    <input
                        type={mostrarSenha ? 'text' : 'password'}
                        placeholder="Senha"
                        className="w-full p-2 pr-10 rounded bg-zinc-800 text-white"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <span
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                    >
                        {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                </div>

                {/* Confirmar senha (apenas no cadastro) */}
                {modoCadastro && (
                    <div className="relative">
                        <input
                            type={mostrarSenha ? 'text' : 'password'}
                            placeholder="Confirmar senha"
                            className="w-full p-2 pr-10 rounded bg-zinc-800 text-white"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            required
                        />
                        <span
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-white"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                        >
                            {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                        </span>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-yellow-500 text-black font-bold p-2 rounded hover:bg-yellow-400 transition"
                >
                    {modoCadastro ? 'Cadastrar' : 'Entrar'}
                </button>

                <p className="text-sm text-center pt-2">
                    {modoCadastro ? 'Já tem conta?' : 'Ainda não tem conta?'}{' '}
                    <button
                        type="button"
                        onClick={() => setModoCadastro(!modoCadastro)}
                        className="text-yellow-400 underline"
                    >
                        {modoCadastro ? 'Entrar' : 'Criar conta'}
                    </button>
                </p>
            </form>
        </div>
    )
}
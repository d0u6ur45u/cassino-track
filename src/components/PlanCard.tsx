'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const plans = [
    {
        nome: 'Bronze',
        valor: 'R$ 9,90',
        descricao: 'Acesso aos últimos 100 resultados',
        qr: '/qrcodes/bronze.png',
    },
    {
        nome: 'Diamond',
        valor: 'R$ 99,90',
        descricao: 'Acesso total + games ao vivo',
        qr: '/qrcodes/diamond.png',
    },
]

export default function plans() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Header />
            <main className="p-6">
                <h2 className="text-2xl font-bold mb-6">Escolha seu plano</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {plans.map((p, i) => (
                        <div key={i} className="bg-zinc-800 rounded-xl p-4">
                            <h3 className="text-yellow-400 text-lg font-bold mb-2">{p.nome}</h3>
                            <p>{p.descricao}</p>
                            <p className="text-green-400 font-bold mt-2">{p.valor}</p>
                            <img src={p.qr} alt={`QR ${p.nome}`} className="mt-4 w-40" />
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}
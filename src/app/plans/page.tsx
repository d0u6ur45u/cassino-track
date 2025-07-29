'use client'

import { useAuth } from '@/components/AuthProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function SubscriptionPlans() {
    const { user } = useAuth()

    const plans = [
        {
            name: 'Bronze',
            image: '/assets/plans/bronze.png',
            price: 'R$ 29,90/mês',
            description: 'Ideal para iniciantes que desejam começar a acompanhar os resultados',
            features: [
                'Acesso a resultados básicos',
                'Atualizações em tempo real',
                '5 jogos populares disponíveis',
                'Suporte por e-mail',
                'Anúncios no site'
            ],
            featured: false,
            color: 'bg-amber-600',
            buttonColor: 'bg-amber-600 hover:bg-amber-700 text-white'
        },
        {
            name: 'Silver',
            image: '/assets/plans/silver.png',
            price: 'R$ 79,90/mês',
            description: 'Para jogadores que buscam vantagens competitivas',
            features: [
                'Todos os benefícios Bronze',
                'Atualizações em tempo real',
                '15 jogos premium disponíveis',
                'Estatísticas básicas de tendências',
                'Suporte prioritário',
                'Análises semanais exclusivas'
            ],
            featured: false,
            color: 'bg-gray-300 text-gray-900',
            buttonColor: 'bg-gray-300 hover:bg-gray-400 text-gray-900'
        },
        {
            name: 'Gold',
            image: '/assets/plans/gold.png',
            price: 'R$ 149,90/mês',
            description: 'Solução completa para jogadores sérios',
            features: [
                'Todos os benefícios Silver',
                'Acesso a todos os jogos (50+)',
                'Alertas personalizados',
                'Estatísticas avançadas e históricos',
                'Análises diárias de padrões',
                'Suporte 24/7 via telegram',
                'Webinars mensais exclusivos'
            ],
            featured: true,
            color: 'bg-yellow-500 text-gray-900',
            buttonColor: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
        },
        {
            name: 'Diamond',
            image: '/assets/plans/diamond.png',
            price: 'R$ 299,90/mês',
            description: 'Experiência premium para high rollers e profissionais',
            features: [
                'Todos os benefícios Gold',
                'Acesso VIP a dados exclusivos',
                'Relatórios personalizados sob demanda',
                'Consultoria individual com especialistas',
                'Acesso antecipado a novos recursos',
                'Suporte dedicado com gerente de conta',
                'Convites para eventos exclusivos'
            ],
            featured: false,
            color: 'bg-blue-500',
            buttonColor: 'bg-blue-500 hover:bg-blue-600 text-white'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">Planos de Assinatura</h1>
                    <p className="text-xl max-w-3xl mx-auto">
                        Escolha o plano que se adapta ao seu estilo de jogo e tenha acesso a análises precisas, estatísticas avançadas e vantagens exclusivas que podem fazer toda a diferença.
                    </p>
                    {!user && (
                        <p className="mt-4 text-yellow-400">
                            Já é membro? <Link href="/login" className="font-semibold underline">Faça login</Link> para acessar seu plano.
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 ${plan.featured ? 'border-2 border-yellow-400' : 'border border-gray-700'}`}
                        >
                            {/* Seção da Imagem */}
                            <div className="relative h-40 bg-gray-800 flex items-center justify-center">
                                <Image
                                    src={plan.image}
                                    alt={plan.name}
                                    width={120}
                                    height={120}
                                    className="object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.onerror = null
                                        target.src = '/assets/plans/default.png'
                                    }}
                                />
                            </div>

                            {/* Seção do Título e Preço */}
                            <div className={`${plan.color} p-6 text-center`}>
                                <h2 className="text-2xl font-bold">{plan.name}</h2>
                                <p className="text-xl font-semibold mt-2">{plan.price}</p>
                            </div>

                            {/* Seção de Conteúdo */}
                            <div className="bg-gray-800 p-6">
                                <p className="text-gray-300 mb-6">{plan.description}</p>
                                <ul className="space-y-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8 text-center">
                                    <Link
                                        href={user ? "/payment" : "/register"}
                                        className={`inline-block px-6 py-3 rounded-lg font-bold ${plan.buttonColor} transition-colors`}
                                    >
                                        Assinar Agora
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-gray-800 rounded-xl p-8 max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Por que se tornar um assinante?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Vantagens Exclusivas</h3>
                            <p className="text-gray-300 mb-4">
                                Nossos assinantes têm acesso a dados que não estão disponíveis publicamente, incluindo padrões de resultados, estatísticas avançadas e alertas em tempo real que podem ajudar na tomada de decisões estratégicas.
                            </p>
                            <p className="text-gray-300">
                                Com anos de experiência no mercado, nossa equipe de analistas desenvolveu metodologias exclusivas para identificar tendências e oportunidades que podem aumentar suas chances de sucesso.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Suporte Personalizado</h3>
                            <p className="text-gray-300 mb-4">
                                Dependendo do seu plano, você terá acesso a diferentes níveis de suporte, desde respostas rápidas por e-mail até consultoria individual com nossos especialistas.
                            </p>
                            <p className="text-gray-300">
                                Nossos assinantes premium recebem relatórios personalizados, análises sob demanda e até mesmo recomendações estratégicas baseadas em seu histórico e preferências de jogo.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-400 text-sm">
                        * Todos os planos são cobrados mensalmente. Cancelamento a qualquer momento. <br />
                        ** Este serviço fornece apenas análises estatísticas e não garante resultados de jogos.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
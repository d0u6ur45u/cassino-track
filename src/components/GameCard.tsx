type Props = {
    nome: string
    resultados: string[]
}

export default function GameCard({ nome, resultados }: Props) {
    return (
        <div className="bg-[#111] border border-[#FFD700]/20 rounded-2xl p-4 shadow-lg w-full max-w-xs transition hover:scale-105 hover:border-[#FFD700]">
            <h3 className="text-lg text-[#FFD700] font-semibold mb-3 tracking-wide">{nome}</h3>
            <div className="flex flex-wrap gap-2">
                {resultados.map((r, i) => (
                    <span
                        key={i}
                        className="bg-[#C00000] text-white px-3 py-1 rounded-full text-xs font-mono tracking-wide"
                    >
                        {r}
                    </span>
                ))}
            </div>
        </div>
    )
}
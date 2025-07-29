type Props = {
    tipo: 'erro' | 'sucesso'
    mensagem: string
}

export default function Alerta({ tipo, mensagem }: Props) {
    return (
        <div className={`p-3 rounded-md text-sm font-medium mb-3 
      ${tipo === 'erro' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
            {mensagem}
        </div>
    )
}
export function traduzirErroFirebase(codigo: string) {
    const erros: Record<string, string> = {
        'auth/invalid-email': 'Email inválido. Verifique o formato.',
        'auth/email-already-in-use': 'Este email já está em uso.',
        'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
        'auth/user-not-found': 'Usuário não encontrado.',
        'auth/wrong-password': 'Senha incorreta. Tente novamente.',
        'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
    }

    return erros[codigo] || 'Erro ao processar. Tente novamente.'
}
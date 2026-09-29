import {useEffect, useState} from 'react';
import {movimentacaoApi, produtoApi} from '../api/api';
import type {Produto, TipoMovimentacao} from "../types";

interface Props {
    onMovimentacaoCriada: () => void;
}

export function FormularioMovimentacao({ onMovimentacaoCriada }: Props) {
    const [produto, setProduto] = useState(0);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [tipo, setTipo] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [erro, setErro] = useState('');

    useEffect(() => {
        produtoApi
            .listar()
            .then(setProdutos)
            .catch(() => setErro('Erro ao carregar produtos'));
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const quantidadeNum = Number(quantidade);
        const tipoTipada: TipoMovimentacao = tipo as "ENTRADA" | "SAIDA"

        if (!produto) {
            setErro('Informe o nome da categoria');
            return;
        }

        setErro('');
        await movimentacaoApi.criar({
            produtoId: produto,
            tipo: tipoTipada,
            quantidade: quantidadeNum
        });
        setProduto(0);
        setTipo('');
        setQuantidade('');
        onMovimentacaoCriada();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Nova Movimentacao</h3>
            <div>
                <label htmlFor="produto">Produto:</label>
                <input id="produto" placeholder="Caneta Esferográfica" value={produto} onChange={(e) => setProduto(Number(e.target.value))} />
            </div>
            <div>
                <label htmlFor="quantidade">Quantidade: </label>
                <input id="quantidade" type="text" inputMode={"numeric"} placeholder="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
            </div>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <button type="submit">Salvar</button>
        </form>
    );
}
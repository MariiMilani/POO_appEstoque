import {useEffect, useState} from 'react';
import {movimentacaoApi, produtoApi} from '../api/api';
import type {Produto, TipoMovimentacao} from "../types";

interface Props {
    onMovimentacaoCriada: () => void;
}

export function FormularioMovimentacao({ onMovimentacaoCriada }: Props) {
    const [produto, setProduto] = useState(0);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [tipo, setTipo] = useState<TipoMovimentacao>('ENTRADA');
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

        if (!produto) {
            setErro('Produto obrigatório');
            return;
        }

        if(!quantidade){
            setErro('Quantidade obrigatória');
            return
        } else if(quantidadeNum < 0 || !Number.isInteger(quantidadeNum)) {
            setErro('Quantidade inteira maior ou igual a zero');
            return;
        }

        setErro('');

        try {
            await movimentacaoApi.criar({
                produtoId: produto,
                tipo,
                quantidade: quantidadeNum
            });


            setProduto(0);
            setTipo('ENTRADA');
            setQuantidade('');
            onMovimentacaoCriada();
        } catch (e) {
            const err = e as { response?: { data?: { message?: string } | string } };
            const data = err.response?.data;
            setErro(typeof data === 'string' ? data : data?.message ?? 'Erro ao salvar a movimentação');
        }



    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Nova Movimentacao</h3>
            <div>
                <label htmlFor="produto">Produto: </label>
                <select id="produto" value={produto} onChange={(e) => setProduto(Number(e.target.value))}>
                    <option value={0}>Selecione o produto</option>
                    {produtos.map((p) => (
                        <div>
                            <option key={p.id} value={p.id}>
                                {p.nome}. Em estoque: {p.quantidade}
                            </option>
                        </div>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="quantidade">Quantidade: </label>
                <input id="quantidade" type="text" inputMode={"numeric"} placeholder="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
            </div>

            <div>
                <label htmlFor="tipo">Tipo: </label>
                <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value as TipoMovimentacao)}>
                    <option key="0" value="ENTRADA">Entrada</option>
                    <option key="1" value="SAIDA">Saída</option>
                </select>
            </div>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <button type="submit">Salvar</button>
        </form>
    );
}
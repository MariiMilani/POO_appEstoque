import { useEffect, useState } from 'react';
import {type Movimentacao} from '../types';
import {movimentacaoApi} from '../api/api';
import {ListaMovimentacoes} from "../components/ListaMovimentacoes.tsx";
import {FormularioMovimentacao} from "../components/FormularioMovimentacao.tsx";

export function MovimentacoesPage() {
    const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

    async function carregar() {
        setMovimentacoes(await movimentacaoApi.listar());
    }

    useEffect(() => {
        carregar();
    }, []);

    return (
        <div>
            <h2>Movimentação</h2>
            <ListaMovimentacoes movimentacoes={movimentacoes} />
            <hr />
            <FormularioMovimentacao onMovimentacaoCriada={carregar} />
        </div>
    );
}
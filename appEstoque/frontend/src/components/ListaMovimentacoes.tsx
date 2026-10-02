import {type Movimentacao} from '../types';

interface Props {
    movimentacoes: Movimentacao[];
}

export function ListaMovimentacoes({ movimentacoes }: Props) {
    if(movimentacoes.length == 0){
        return (
            <h3>Não existem movimentações cadastradas.</h3>
        )
    }

    return (
        <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Criado em:</th>
                <th>Produto</th>
                <th>Tipo</th>
                <th>Quantidade</th>
            </tr>
            </thead>
            <tbody>
            {movimentacoes.map((movimentacao) => (
                <tr key={movimentacao.id}>
                    <td>{movimentacao.id}</td>
                    <td>{new Date(movimentacao.criadoEm).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</td>
                    <td>{movimentacao.produto.nome}</td>
                    <td style={{color: movimentacao.tipo === 'ENTRADA' ? 'green' : 'red' }}>{movimentacao.tipo}</td>
                    <td>{movimentacao.quantidade}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
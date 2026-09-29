import { useState } from 'react';
import { produtoApi } from '../api/api';

interface Props {
    onProdutoCriado: () => void;
}

export function FormularioProduto({ onProdutoCriado }: Props) {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [quantidade, setQuantidade] = useState(0);
    const [categoria, setCategoria] = useState(0);
    const [erro, setErro] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!nome) {
            setErro('Informe o nome do produto');
            return;
        }

        if (!preco) {
            setErro('Informe o preço do produto');
            return;
        }

        if (!quantidade) {
            setErro('Informe a quantidade de produtos');
            return;
        }

        if (!categoria) {
            setErro('Informe a categoria');
            return;
        }

        const categoriaId = 1;

        setErro('');
        await produtoApi.criar({
            nome,
            preco,
            quantidade,
            categoriaId
        });
        setNome('');
        onProdutoCriado();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Novo Produto</h3>
            <input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(Number(e.target.value))} />
            <input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))} />
            <input type="number" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(Number(e.target.value))} />
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <button type="submit">Salvar</button>
        </form>
    );
}
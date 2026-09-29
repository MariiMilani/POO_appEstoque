import {useEffect, useState} from 'react';
import {categoriaApi, produtoApi} from '../api/api';
import type {Categoria} from "../types";

interface Props {
    onProdutoCriado: () => void;
}

export function FormularioProduto({ onProdutoCriado }: Props) {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [categoria, setCategoria] = useState(0);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [erro, setErro] = useState('');

    useEffect(() => {
        categoriaApi
            .listar()
            .then(setCategorias)
            .catch(() => setErro('Erro ao carregar categorias'));
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const precoNum = Number(preco.replace(',', '.'));
        const quantidadeNum = Number(quantidade);

        if (!nome) {
            setErro('Nome obrigatório');
            return;
        }

        if(!preco){
            setErro('Preço obrigatório');
            return
        } else if (isNaN(precoNum) || precoNum <= 0) {
            setErro('Preço deve ser maior que zero');
            return;
        }

        if(!quantidade){
            setErro('Quantidade obrigatória');
            return
        } else if(quantidadeNum < 0 || !Number.isInteger(quantidadeNum)) {
            setErro('Quantidade inteira maior ou igual a zero');
            return;
        }

        if (!categoria) {
            setErro('Categoria obrigatória');
            return;
        }

        setErro('');
        await produtoApi.criar({
            nome,
            preco: precoNum,
            quantidade: quantidadeNum,
            categoriaId: categoria
        });
        setNome('');
        setPreco('');
        setQuantidade('');
        setCategoria(0);
        onProdutoCriado();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Novo Produto</h3>
            <div>
                <label htmlFor="nome">Nome: </label>
                <input id="nome" placeholder="Caneta Esferográfica" value={nome} onChange={(e) => setNome(e.target.value)} />

            </div>

            <div>
                <label htmlFor="preco">Preço: </label>
                <input id="preco" type="text" inputMode={"decimal"} placeholder="10.50" value={preco} onChange={(e) => setPreco(e.target.value)} />
            </div>

            <div>
                <label htmlFor="quantidade">Quantidade: </label>
                <input id="quantidade" type="text" inputMode={"numeric"} placeholder="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
            </div>

            <div>
                <label htmlFor="categoria">Categoria: </label>
                <select id="categoria" value={categoria} onChange={(e) => setCategoria(Number(e.target.value))}>
                    <option value={0}>Selecione a categoria</option>
                    {categorias.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.nome}
                        </option>
                    ))}
                </select>
            </div>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <button type="submit">Salvar</button>
        </form>
    );
}
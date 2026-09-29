import { useEffect, useState } from 'react';
import type {Produto} from "../types";
import {ListaProdutos} from "../components/ListaProdutos.tsx";
import {produtoApi} from "../api/api.ts";
import {FormularioProduto} from "../components/FormularioProduto.tsx";

export function ProdutosPage() {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    async function carregar() {
        setProdutos(await produtoApi.listar());
    }

    useEffect(() => {
        carregar();
    }, []);

    return (
        <div>
            <h2>Produtos</h2>
            <ListaProdutos produtos={produtos} />
            <hr />
            <FormularioProduto onProdutoCriado={carregar} />
        </div>
    );
}